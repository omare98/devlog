---
title: Memulai catatan pengembangan
date: 2026-10-22
summary: Catatan membangun toko jasa titip belanja untuk pelanggan Indonesia yang ingin membeli barang Korea.
tags: [Awal, Toko]
---

Saya sedang membangun toko jasa titip belanja: toko ini membelikan barang Korea atas nama pelanggan di Indonesia lalu mengirimkannya. Blog ini mencatat apa yang saya putuskan selama membangunnya, beserta alasannya.

## Susunan saat ini

- **Server:** Spring Boot 4.1 (Java 25, build Gradle multi-modul yang memisahkan API admin dan API toko), MariaDB, Flyway
- **Layar:** situs admin dan situs toko, keduanya ditulis dengan React dan TypeScript
- **Aplikasi:** aplikasi Android hibrida yang dibungkus dengan Capacitor
- **Bahasa:** semua teks layar, pesan galat, dan email tersedia dalam empat bahasa: Korea, Inggris, Mandarin, dan Indonesia

## Yang akan saya tulis

- Cara membuat tema toko musiman dengan variabel CSS
- Pelajaran dari memperbesar bilah tab bawah di ponsel
- Merancang izin admin (peran dan akun) sebagai satu alur
