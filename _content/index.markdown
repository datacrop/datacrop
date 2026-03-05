---
layout: home
permalink: /
nav_exclude: true
---

# DataCROP&#8482; Information 
DataCROP&#8482; (Data Collection Routing & Processing) is a Data collection framework which provides the specifications and relevant implementation to enable a real time data collection, transformation, filtering, and management service to facilitate data consumers (i.e., analytic algorithms). The framework can be applied in IoT environments supporting solutions in various domains (e.g., Industrial, Cybersecurity, etch.). For example, the solution may be used to collect security related data (e.g., network, system, solution proprietary, etch.) from monitored IoT systems and store them to detect patterns of abnormal behaviour by applying simple (i.e., filtering and pre-processing) or more elaborated mechanisms (i.e., AI algorithms). The design of the framework is driven by configurability, extensibility, dynamic setup, stream handling capabilities and Blockchain (Ledger) support. One of the key features of the framework is that it is detached from the underlying infrastructure by employing a specialized data model for modelling the solution’s Data Sources, Processors and Results which facilitates the data interoperability discoverability and configurability of the offered solution.    


## Demonstrator

A DataCROP&#8482; Farro version demo infrastracture instance, which can be deployed locally, can be found at the [farro-demo-deployment-scripts](https://github.com/datacrop/farro-demo-deployment-scripts) repository.

## Technologies/Framework 
DataCROP has been developed and applied in various iterations, within the context of various EU projects, with different dependencies 
 
**DataCROP&#8482; Barley** (v1.0)
Outcome of FAR-EDGE EU Project
*	MongoDB 
*	Apache Kafka (Inter-Data Bus) 
*	RabitMQ (Data Input interface) 
*	Kafka Streams (Stream Processing) 
*	NodeJS (Component Implementation) 
*	React (UI) 
*	Hyperledger Fabric (optional Blockchain support) 
 
**DataCROP&#8482; Farro** (v2.0) 
Outcome of Barley version and PROPHESY EU project
*	MongoDB 
*	Apache Kafka (Inter-Data Bus communication & input/output interface) 
*	RabbitMQ (Data Input interface) 
* Algorithms: 
** Java Algorithms (Qarma) 
** Python Algorithms (RUL feature extraction & Health Index Calculation) 
** R Algorithms 
* NodeJS (Component Implementation) 
* React (UI) 
 
**DataCROP&#8482; Maize** :corn: (V3.0) - (under construction :construction:) 
Outcome of Farro version and SecureIoT, IoTAC EU projects 
*	MongoDB 
*	Apache Kafka (Inter-Data Bus) 
*	ELK Stack 
*	Additional to be included as developments evolves


## Maturity Level / Active years 


V1.0 - TRL 6 
Designed/Developed and demonstrated under the FAR-EDGE (2016-2019) project 
 
V2.0 - TRL6 
Designed/Developed and demonstrated under the H2020 PROPHESY (2017-2020) project. Demonstrated under the QU4LITY (2019-2022) project 
 
 
V3.0 – TRL4 (Under design/Development) 
Designed/Developed under the SecureIoT (2018-2021) project, IoTAC (2020-2023), STAR (2020-2023) 






## Future/ Interest Steps 
*	Intergrade the design/data models/components into one platform/infrastructure independent solution.  
*	Support additional data collection, data processing and data offering services. 
*	Offer an intuitive and user-friendly configuration toolbox (UI).  
*	Offer data visualization mechanisms (UI).  
*	Blockchain (Hyperledger Fabric) integration supporting the configurations and results of the solution.


## Links:

* [DataCROP@DockerHub](https://hub.docker.com/u/datacrop)
* [Stats@OpenHUB](https://www.openhub.net/p/datacrop)

