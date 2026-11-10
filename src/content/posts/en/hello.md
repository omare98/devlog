---
title: Starting the dev log
date: 2026-10-22
summary: Notes on building a purchasing-agent shop for Indonesian customers who want Korean goods.
tags: [Start, Shop]
---

I am building a purchasing-agent shop: it buys Korean goods on behalf of customers in Indonesia and ships them over. This blog records what I decided while building it, and why.

## The current setup

- **Server:** Spring Boot 4.1 (Java 25, a multi-module Gradle build that separates the admin API from the shop API), MariaDB, Flyway
- **Screens:** an admin site and a shop site, both written in React and TypeScript
- **App:** a hybrid Android app wrapped with Capacitor
- **Languages:** every screen text, error message and email comes in four languages: Korean, English, Chinese and Indonesian

## What I plan to write about

- How I built seasonal shop themes with CSS variables
- What I learned from enlarging the mobile bottom tab bar
- Designing admin permissions (roles and accounts) as one flow
