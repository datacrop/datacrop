---
title: Keycloak
slug: /deploy/manual/keycloak/
sidebar_position: 1
description: Identity provider for WME — the ready-made realm, or configuring your own.
---

# Keycloak

WME authenticates users with **Keycloak** (OpenID Connect). The editor logs users in; the backend validates their JWTs against Keycloak's public keys.

## Option A — the ready-made realm (recommended)

The [Maize MVP](/deploy/maize-mvp/) runs Keycloak 24 (`start-dev --import-realm`, port **8180**) from its `keycloak/` folder and imports a complete realm on first start. `make init` writes every value it needs into the MVP's root `.env`; `make up` starts it with the rest of the platform. To run Keycloak on its own, put these variables in a `.env` in `maize-mvp/keycloak` and run `docker compose up -d` there:

| Variable | Purpose |
|---|---|
| `PUBLIC_HOST` | Host in the realm's redirect URIs and in the token issuer (`http://PUBLIC_HOST:8180/realms/datacrop-Platform`) |
| `KEYCLOAK_ADMIN`, `KEYCLOAK_ADMIN_PASSWORD` | Master realm administrator |
| `WME_ADMIN_PASSWORD` | Password of the realm's `admin` user (editor login) |
| `KC_BACK_CLIENT_SECRET`, `KC_AIRFLOW_WRAPPER_SECRET` | Secrets of the confidential `datacrop-back` and `airflow-wrapper` clients |

An init container renders `realm/realm-template.json` with these values into the imported realm:

| Item | Value |
|---|---|
| Realm | `datacrop-Platform` (registration disabled, SSL not required) |
| Client `datacrop-front` | Public client for the editor. Accepts the editor on port **80** (`http://PUBLIC_HOST/*`) and on **5173** (`http://PUBLIC_HOST:5173/*`); client roles `admin`, `user` |
| Client `datacrop-back` | Confidential backend client with a service account; client roles `admin`, `user`, `uma_protection` |
| Client `airflow-wrapper` | Confidential client with a service account (role `admin`) |
| Groups | `admins` (admin role on front and back clients), `users` |
| User | `admin` / `WME_ADMIN_PASSWORD` in `/admins` |
| Mapper | Adds the `userId` claim the backend requires |

Keycloak admin console: `http://PUBLIC_HOST:8180/admin` (`KEYCLOAK_ADMIN` / `KEYCLOAK_ADMIN_PASSWORD`). Add users there and put administrators in the `admins` group.

Keycloak imports the realm only when it does not exist yet. On every start, the `keycloak-config` container also adds any missing port-80 and 5173 redirect URIs, web origins and post-logout URIs to `datacrop-front`, so realms imported from older templates gain port-80 support on the next `make up`. It never removes entries.

:::note[What the backend needs from Keycloak]
The backend validates tokens with `KEYCLOAK_ISSUER_URI` (must equal the tokens' `iss`) and `KEYCLOAK_JWK_SET_URI`, and reads API roles from `KEYCLOAK_CLIENT_ID` (`datacrop-back`). It needs no client secret.
:::

## Serving the editor on port 80, 5173 or another address

The editor's host port is `UI_PORT`: `5173` by default, or `80` so users open `http://PUBLIC_HOST`. Two settings must allow the editor's origin, the exact scheme, host and port the browser shows (port 80 has no `:80`):

1. **Keycloak**, on the `datacrop-front` client:
   - **Valid redirect URIs** and **Valid post logout redirect URIs**: `http://HOST/*` for port 80, `http://HOST:5173/*` for 5173.
   - **Web origins**: `http://HOST` for port 80, `http://HOST:5173` for 5173.
2. **Backend and assistant CORS**: `CORS_ALLOWED_ORIGINS`, a comma-separated list such as `http://HOST,http://HOST:5173`. The assistant runtime uses the same list.

The MVP sets both for port 80 and 5173. For any other port, a domain name or HTTPS, add that origin in both places, for example `https://wme.example.org/*` and `https://wme.example.org`. If either is missing, Keycloak shows *Invalid parameter: redirect_uri* or the editor logs in but its API calls fail with CORS errors.

## Option B — your own Keycloak

Use these steps to configure an existing Keycloak. You need three clients — frontend, backend and wrapper — plus roles and users.

### Token contents expected by the backend

- A custom claim **`userId`** must be present in the access token. Without it, calls that depend on the current user fail with "User not found". Add a protocol mapper (for example mapping the user's UUID).
- Roles are read from `realm_access` and `resource_access`. Any role whose name contains `admin` makes the user an administrator in the editor.

### Prerequisites

Before starting, ensure you have:
- Access to the Keycloak Administrator UI.
- Administrator privileges to create and configure realms, clients, and roles.
  
### Steps

#### 1. Log in as an Administrator

1. Access your Keycloak instance through the administrator URL.
2. Log in using your administrator credentials.

#### 2. Create a New Realm

1. In the Keycloak UI, select **Add Realm**.
2. Provide a name for your realm (e.g., `my-realm`).
3. Save the new realm.

#### 3. Configure the Frontend Client

1. **Create a Client**:
   - Navigate to **Clients** > **Create**.
   - Name the client (e.g., `frontend-client`).
   - In the **Root URL**, **Admin URL**, and **Base URL**, use your own machine's IP (placeholder shown below):
     ```json
     "rootUrl": "http://YOUR_IP",
     "adminUrl": "http://YOUR_IP",
     "baseUrl": "http://YOUR_IP",
     ```
   - Update the **Redirect URIs**. Keep the entries for the ports you serve the editor on: `http://YOUR_IP/*` for port 80, `http://YOUR_IP:5173/*` for 5173 (see [Serving the editor](#serving-the-editor-on-port-80-5173-or-another-address)):
     ```json
     "redirectUris": [
       "http://YOUR_IP/*",
       "http://YOUR_IP:5173/*"
     ]
     ```
   - Update the **Web Origins**, without a trailing path:
     ```json
     "webOrigins": [
       "http://YOUR_IP",
       "http://YOUR_IP:5173"
     ]
     ```
   - For **Post Logout Redirect URIs**, use:
     ```json
     "post.logout.redirect.uris": "http://YOUR_IP/*##http://YOUR_IP:5173/*"
     ```
   - Add the same origins to the backend's `CORS_ALLOWED_ORIGINS`.

2. **Configure Client Settings**:
   - Disable **Client Authentication** and **Authorization**.
   - Enable **Standard Flow** and **Direct Access Grants**.

3. **Assign Roles**:
   - Go to the **Roles** tab and add `admin` and `user` roles.

4. **Create a Frontend-Dedicated Client Scope**:
   - Navigate to **Client Scopes** and ensure there is a frontend-dedicated scope.

#### 4. Configure the Backend Client

1. **Create a Client**:
   - Name the client (e.g., `backend-client`).
   - In the **Authenticator Type**, choose **Client-Secret**.
   - Save the generated secret for later use.

2. **Configure URLs**:
   - Set the following URLs for the backend:
     ```json
     "rootUrl": "http://YOUR_IP:9090",
     "adminUrl": "",
     "baseUrl": "http://YOUR_IP:9090",
     "redirectUris": [
       "http://YOUR_IP:9090/*"
     ],
     "webOrigins": [
       ""
     ]
     ```

3. **Configure Client Settings**:
   - Enable **Client Authentication** and **Authorization**.
   - Enable **Standard Flow**, **Implicit Flow**, and **Direct Access Grants**.

4. **Assign Roles**:
   - Go to the **Roles** tab and add `admin` and `user` roles.

5. **Create a Backend-Dedicated Client Scope**:
   - Navigate to **Client Scopes** and ensure there is a backend-dedicated scope.

#### 5. Configure the Wrapper Client

1. **Create a Client**:
   - Name the client (e.g., `wrapper-client`).
   - No need to configure any URLs for this client.

2. **Configure Client Settings**:
   - Enable **Client Authentication**.
   - Enable **Standard Flow**, **Direct Access Grants**, and **Service Accounts Roles**.

3. **Assign Roles**:
   - Add `admin` roles to the client.

4. **Create a Wrapper-Dedicated Client Scope**:
   - Ensure there is a wrapper-dedicated client scope.

#### 6. Configure Realm Roles

1. **Verify Default Roles**:
   - Go to the **Roles** section of the realm.
   - Ensure that there is a role named `default-roles`.

#### 7. Create the Admins Group

1. **Create a Group**:
   - Navigate to the **Groups** section.
   - Create a group named `admins`.

2. **Assign Roles to the Admins Group**:
   - In the **Role Mappings** tab of the group, assign roles related to the frontend and backend services.

#### 8. Create Users and Assign Roles

1. **Create a User**:
   - Navigate to the **Users** section.
   - Create a new user, providing the required information.
   
2. **Set Password**:
   - After creating the user, navigate to the **Credentials** tab.
   - Set a password for the user.

3. **Assign Roles to the User**:
   - In the **Role Mappings** tab of the user, assign the `default-roles` role.

4. **Add User to Admins Group**:
   - Go to the **Groups** tab and make the user join the `admins` group.

#### 9. Adjust Realm Settings

1. **Session and Token Settings**:
   - Navigate to the **Realm Settings** section.
   - Adjust session duration settings and token settings according to the service's security requirements.

#### Final Steps

- After configuring all clients, ensure that each client is properly assigned its dedicated scope and roles.
- You can verify the configuration by testing the login and authentication flows for the frontend, backend, and wrapper components.
