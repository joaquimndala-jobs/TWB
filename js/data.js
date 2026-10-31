/**
 * Tmcel – Moçambique Telecom, SA
 * Catálogo de dados extraído do website oficial (https://www.tmcel.mz/)
 * e persistido localmente para o redesenho académico (UniSCED / TWeb 2026).
 *
 * Fonte: páginas Netgiro, Recargas GIGA, Pacote Jovem, Pacotes PLUS,
 * BandaLarga, Tarifas Nacionais, Tomalá e notícias oficiais.
 */
(function (global) {
  "use strict";

  var PACKAGES = [
    { id: "ng-80-6h", name: "Netgiro 80 MB", category: "Netgiro", type: "pre-pago", price: 2, volumeMb: 80, validityDays: 0.25, validityLabel: "6 horas", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-120-1h", name: "Netgiro 120 MB", category: "Netgiro", type: "pre-pago", price: 2, volumeMb: 120, validityDays: 0.04, validityLabel: "1 hora", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-300", name: "Netgiro Diário 300 MB", category: "Netgiro", type: "pre-pago", price: 5, volumeMb: 300, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-650", name: "Netgiro Diário 650 MB", category: "Netgiro", type: "pre-pago", price: 10, volumeMb: 650, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-895", name: "Netgiro Diário 895 MB", category: "Netgiro", type: "pre-pago", price: 20, volumeMb: 895, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-1750", name: "Netgiro Diário 1.7 GB", category: "Netgiro", type: "pre-pago", price: 40, volumeMb: 1750, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-2150", name: "Netgiro Diário 2.1 GB", category: "Netgiro", type: "pre-pago", price: 50, volumeMb: 2150, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-4500", name: "Netgiro Diário 4.5 GB", category: "Netgiro", type: "pre-pago", price: 100, volumeMb: 4500, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-2048", name: "Netgiro Semanal 2 GB", category: "Netgiro", type: "pre-pago", price: 50, volumeMb: 2048, validityDays: 7, validityLabel: "7 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-3276", name: "Netgiro Semanal 3.2 GB", category: "Netgiro", type: "pre-pago", price: 75, volumeMb: 3276, validityDays: 7, validityLabel: "7 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-4096", name: "Netgiro Semanal 4 GB", category: "Netgiro", type: "pre-pago", price: 100, volumeMb: 4096, validityDays: 7, validityLabel: "7 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-10240", name: "Netgiro Semanal 10 GB", category: "Netgiro", type: "pre-pago", price: 200, volumeMb: 10240, validityDays: 7, validityLabel: "7 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-16348", name: "Netgiro Semanal 16 GB", category: "Netgiro", type: "pre-pago", price: 300, volumeMb: 16348, validityDays: 7, validityLabel: "7 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-3993", name: "Netgiro Mensal 3.9 GB", category: "Netgiro", type: "pre-pago", price: 100, volumeMb: 3993, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-15360", name: "Netgiro Mensal 15 GB", category: "Netgiro", type: "pre-pago", price: 300, volumeMb: 15360, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-35840", name: "Netgiro Mensal 35 GB", category: "Netgiro", type: "pre-pago", price: 600, volumeMb: 35840, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-43008", name: "Netgiro Mensal 42 GB", category: "Netgiro", type: "pre-pago", price: 800, volumeMb: 43008, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-50176", name: "Netgiro Mensal 49 GB", category: "Netgiro", type: "pre-pago", price: 1200, volumeMb: 50176, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-66560", name: "Netgiro Mensal 65 GB", category: "Netgiro", type: "pre-pago", price: 1500, volumeMb: 66560, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-85204", name: "Netgiro Mensal 83 GB", category: "Netgiro", type: "pre-pago", price: 2000, volumeMb: 85204, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-112640", name: "Netgiro Mensal 110 GB", category: "Netgiro", type: "pre-pago", price: 2600, volumeMb: 112640, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-142640", name: "Netgiro Mensal 139 GB", category: "Netgiro", type: "pre-pago", price: 3200, volumeMb: 142640, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "ng-190000", name: "Netgiro Mensal 185 GB", category: "Netgiro", type: "pre-pago", price: 4000, volumeMb: 190000, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 2", date: "2025-01-15" },
    { id: "giga-30", name: "Recarga GIGA 1 GB", category: "Recargas GIGA", type: "pre-pago", price: 30, volumeMb: 1024, validityDays: 7, validityLabel: "7 dias", ussd: "*123#", date: "2025-03-01" },
    { id: "giga-80", name: "Recarga GIGA 3 GB", category: "Recargas GIGA", type: "pre-pago", price: 80, volumeMb: 3072, validityDays: 15, validityLabel: "15 dias", ussd: "*123#", date: "2025-03-01" },
    { id: "giga-150", name: "Recarga GIGA 6 GB", category: "Recargas GIGA", type: "pre-pago", price: 150, volumeMb: 6144, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-03-01" },
    { id: "pj-50", name: "Pacote Jovem Combinado 50", category: "Pacote Jovem", type: "pre-pago", price: 50, volumeMb: 1900, validityDays: 1, validityLabel: "1 dia", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-100", name: "Pacote Jovem Combinado 100", category: "Pacote Jovem", type: "pre-pago", price: 100, volumeMb: 3500, validityDays: 1, validityLabel: "1 dia", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-200", name: "Pacote Jovem Combinado 200", category: "Pacote Jovem", type: "pre-pago", price: 200, volumeMb: 5500, validityDays: 7, validityLabel: "7 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-300", name: "Pacote Jovem Combinado 300", category: "Pacote Jovem", type: "pre-pago", price: 300, volumeMb: 9830, validityDays: 7, validityLabel: "7 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-600", name: "Pacote Jovem Combinado 600", category: "Pacote Jovem", type: "pre-pago", price: 600, volumeMb: 12902, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-900", name: "Pacote Jovem Combinado 900", category: "Pacote Jovem", type: "pre-pago", price: 900, volumeMb: 21299, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-1200", name: "Pacote Jovem Combinado 1200", category: "Pacote Jovem", type: "pre-pago", price: 1200, volumeMb: 26419, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-1500", name: "Pacote Jovem Combinado 1500", category: "Pacote Jovem", type: "pre-pago", price: 1500, volumeMb: 31027, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "pj-2000", name: "Pacote Jovem Combinado 2000", category: "Pacote Jovem", type: "pre-pago", price: 2000, volumeMb: 39731, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-02-10" },
    { id: "plus-300", name: "Giro PLUS 300", category: "Pacotes PLUS", type: "pre-pago", price: 300, volumeMb: 6700, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "plus-400", name: "Giro PLUS 400", category: "Pacotes PLUS", type: "pre-pago", price: 400, volumeMb: 8933, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "plus-600", name: "Giro PLUS 600", category: "Pacotes PLUS", type: "pre-pago", price: 600, volumeMb: 14400, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "plus-900", name: "Giro PLUS 900", category: "Pacotes PLUS", type: "pre-pago", price: 900, volumeMb: 21000, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "plus-1200", name: "Giro PLUS 1200", category: "Pacotes PLUS", type: "pre-pago", price: 1200, volumeMb: 30000, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "plus-1500", name: "Giro PLUS 1500", category: "Pacotes PLUS", type: "pre-pago", price: 1500, volumeMb: 36000, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "plus-2000", name: "Giro MAX 2000", category: "Pacotes PLUS", type: "pre-pago", price: 2000, volumeMb: 49333, validityDays: 30, validityLabel: "30 dias", ussd: "*171#", date: "2025-04-01" },
    { id: "bl-4096", name: "BandaLarga Ilimitado 4 Mbps", category: "BandaLarga", type: "pos-pago", price: 1800, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "800 375 375", date: "2025-05-01" },
    { id: "bl-6144", name: "BandaLarga Ilimitado 6 Mbps", category: "BandaLarga", type: "pos-pago", price: 3237, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "800 375 375", date: "2025-05-01" },
    { id: "bl-8192", name: "BandaLarga Ilimitado 8 Mbps", category: "BandaLarga", type: "pos-pago", price: 6444, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "800 375 375", date: "2025-05-01" },
    { id: "bl-lim-3072", name: "BandaLarga 40 GB (3 Mbps)", category: "BandaLarga", type: "pos-pago", price: 1353, volumeMb: 40960, validityDays: 30, validityLabel: "Mensal", ussd: "800 375 375", date: "2025-05-01" },
    { id: "bl-lim-4096", name: "BandaLarga 80 GB (4 Mbps)", category: "BandaLarga", type: "pos-pago", price: 2479, volumeMb: 81920, validityDays: 30, validityLabel: "Mensal", ussd: "800 375 375", date: "2025-05-01" },
    { id: "bl-10240", name: "BandaLarga Ilimitado 10 Mbps", category: "BandaLarga", type: "pos-pago", price: 8427, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "800 375 375", date: "2025-05-01" },
    { id: "ilim-50", name: "Ilimitado 50", category: "Ilimitado", type: "pre-pago", price: 50, volumeMb: 1536, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-100", name: "Ilimitado 100", category: "Ilimitado", type: "pre-pago", price: 100, volumeMb: 3600, validityDays: 1, validityLabel: "1 dia", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-200", name: "Ilimitado 200", category: "Ilimitado", type: "pre-pago", price: 200, volumeMb: 6144, validityDays: 7, validityLabel: "7 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-300", name: "Ilimitado 300", category: "Ilimitado", type: "pre-pago", price: 300, volumeMb: 10240, validityDays: 15, validityLabel: "15 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-600", name: "Ilimitado 600", category: "Ilimitado", type: "pre-pago", price: 600, volumeMb: 21504, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-900", name: "Ilimitado 900", category: "Ilimitado", type: "pre-pago", price: 900, volumeMb: 32768, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-1200", name: "Ilimitado 1200", category: "Ilimitado", type: "pre-pago", price: 1200, volumeMb: 44032, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-1500", name: "Ilimitado 1500", category: "Ilimitado", type: "pre-pago", price: 1500, volumeMb: 54272, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "ilim-2000", name: "Ilimitado 2000", category: "Ilimitado", type: "pre-pago", price: 2000, volumeMb: 75776, validityDays: 30, validityLabel: "30 dias", ussd: "*123# opção 3", date: "2025-06-01" },
    { id: "mc-15", name: "MAX Controle 15 GB", category: "MAX Controle", type: "pos-pago", price: 300, volumeMb: 15360, validityDays: 60, validityLabel: "60 dias", ussd: "Loja / corporate@", date: "2025-07-01" },
    { id: "mc-35", name: "MAX Controle 35 GB", category: "MAX Controle", type: "pos-pago", price: 600, volumeMb: 35840, validityDays: 60, validityLabel: "60 dias", ussd: "Loja / corporate@", date: "2025-07-01" },
    { id: "mc-49", name: "MAX Controle 49 GB", category: "MAX Controle", type: "pos-pago", price: 900, volumeMb: 50176, validityDays: 60, validityLabel: "60 dias", ussd: "Loja / corporate@", date: "2025-07-01" },
    { id: "mc-70", name: "MAX Controle 70 GB", category: "MAX Controle", type: "pos-pago", price: 1550, volumeMb: 71680, validityDays: 60, validityLabel: "60 dias", ussd: "Loja / corporate@", date: "2025-07-01" },
    { id: "mc-115", name: "MAX Controle 115 GB", category: "MAX Controle", type: "pos-pago", price: 2560, volumeMb: 117760, validityDays: 60, validityLabel: "60 dias", ussd: "Loja / corporate@", date: "2025-07-01" },
    { id: "mais-basico", name: "MAIS Básico", category: "Pacotes MAIS", type: "pos-pago", price: 500, volumeMb: 5120, validityDays: 30, validityLabel: "Mensal", ussd: "Loja Tmcel", date: "2025-07-01" },
    { id: "mais-200", name: "MAIS 200", category: "Pacotes MAIS", type: "pos-pago", price: 700, volumeMb: 7168, validityDays: 30, validityLabel: "Mensal", ussd: "Loja Tmcel", date: "2025-07-01" },
    { id: "mais-300", name: "MAIS 300", category: "Pacotes MAIS", type: "pos-pago", price: 1000, volumeMb: 9216, validityDays: 30, validityLabel: "Mensal", ussd: "Loja Tmcel", date: "2025-07-01" },
    { id: "mais-400", name: "MAIS 400", category: "Pacotes MAIS", type: "pos-pago", price: 1350, volumeMb: 12288, validityDays: 30, validityLabel: "Mensal", ussd: "Loja Tmcel", date: "2025-07-01" },
    { id: "mais-600", name: "MAIS 600", category: "Pacotes MAIS", type: "pos-pago", price: 2250, volumeMb: 19456, validityDays: 30, validityLabel: "Mensal", ussd: "Loja Tmcel", date: "2025-07-01" },
    { id: "mais-1000", name: "MAIS 1000", category: "Pacotes MAIS", type: "pos-pago", price: 3500, volumeMb: 31744, validityDays: 30, validityLabel: "Mensal", ussd: "Loja Tmcel", date: "2025-07-01" },
    { id: "nt-2", name: "Aditivo NT 2 GB", category: "Aditivos Dados", type: "pos-pago", price: 200, volumeMb: 2048, validityDays: 30, validityLabel: "Mensal", ussd: "Contrato", date: "2025-07-01" },
    { id: "nt-6", name: "Aditivo NT 6 GB", category: "Aditivos Dados", type: "pos-pago", price: 500, volumeMb: 6144, validityDays: 30, validityLabel: "Mensal", ussd: "Contrato", date: "2025-07-01" },
    { id: "nt-13", name: "Aditivo NT 13 GB", category: "Aditivos Dados", type: "pos-pago", price: 1000, volumeMb: 13312, validityDays: 30, validityLabel: "Mensal", ussd: "Contrato", date: "2025-07-01" },
    { id: "mt-8", name: "MaxTurbo Ilimitado 8 Mbps", category: "MaxTurbo", type: "pos-pago", price: 1499, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "100 / loja", date: "2025-08-01" },
    { id: "mt-11", name: "MaxTurbo Ilimitado 11 Mbps", category: "MaxTurbo", type: "pos-pago", price: 1799, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "100 / loja", date: "2025-08-01" },
    { id: "mt-16", name: "MaxTurbo Ilimitado 16 Mbps", category: "MaxTurbo", type: "pos-pago", price: 2399, volumeMb: 0, validityDays: 30, validityLabel: "Mensal", ussd: "100 / loja", date: "2025-08-01" },
    { id: "sms-2", name: "Pacote SMS 60", category: "SMS", type: "pre-pago", price: 2, volumeMb: 0, validityDays: 1, validityLabel: "1 dia", ussd: "*123#", date: "2025-06-01" },
    { id: "sms-10", name: "Pacote SMS 250", category: "SMS", type: "pre-pago", price: 10, volumeMb: 0, validityDays: 2, validityLabel: "2 dias", ussd: "*123#", date: "2025-06-01" },
    { id: "sms-50", name: "Pacote SMS 2400", category: "SMS", type: "pre-pago", price: 50, volumeMb: 0, validityDays: 30, validityLabel: "30 dias", ussd: "*123#", date: "2025-06-01" }
  ];

  var STORES = [
    { id: "sede", name: "Sede Tmcel", city: "Maputo", province: "Maputo Cidade", address: "Rua Belmiro Obadias Muianga, Nº 384, CP 1483", phone: "+258 21 351 100", hours: "08:00 – 16:30", category: "Sede", lat: -25.9692, lng: 32.5731 },
    { id: "baixa", name: "Loja Baixa", city: "Maputo", province: "Maputo Cidade", address: "Avenida 25 de Setembro, Baixa", phone: "+258 21 351 100", hours: "08:00 – 17:00", category: "Loja", lat: -25.9686, lng: 32.5739 },
    { id: "sommer", name: "Loja Sommerchield", city: "Maputo", province: "Maputo Cidade", address: "Av. Julius Nyerere, Sommerchield", phone: "+258 21 487 805", hours: "08:00 – 17:00", category: "Loja", lat: -25.9570, lng: 32.5980 },
    { id: "matola", name: "Loja Matola", city: "Matola", province: "Maputo Província", address: "Avenida da Liberdade, Matola", phone: "+258 21 351 100", hours: "08:00 – 16:30", category: "Loja", lat: -25.9622, lng: 32.4589 },
    { id: "xai", name: "Loja Xai-Xai", city: "Xai-Xai", province: "Gaza", address: "Avenida Samora Machel, Xai-Xai", phone: "+258 282 22000", hours: "08:00 – 16:00", category: "Agência", lat: -25.0519, lng: 33.6442 },
    { id: "inhambane", name: "Loja Inhambane", city: "Inhambane", province: "Inhambane", address: "Avenida da Independência, Inhambane", phone: "+258 293 20800", hours: "08:00 – 16:00", category: "Agência", lat: -23.8650, lng: 35.3833 },
    { id: "beira", name: "Loja Beira", city: "Beira", province: "Sofala", address: "Avenida Poder Popular, Beira", phone: "+258 23 325 100", hours: "08:00 – 16:30", category: "Loja", lat: -19.8436, lng: 34.8389 },
    { id: "chimoio", name: "Loja Chimoio", city: "Chimoio", province: "Manica", address: "Avenida 25 de Setembro, Chimoio", phone: "+258 251 22000", hours: "08:00 – 16:00", category: "Agência", lat: -19.1164, lng: 33.4833 },
    { id: "tete", name: "Loja Tete", city: "Tete", province: "Tete", address: "Avenida 25 de Junho, Tete", phone: "+258 252 22000", hours: "08:00 – 16:00", category: "Agência", lat: -16.1564, lng: 33.5867 },
    { id: "quelimane", name: "Loja Quelimane", city: "Quelimane", province: "Zambézia", address: "Avenida Samora Machel, Quelimane", phone: "+258 24 213 100", hours: "08:00 – 16:00", category: "Agência", lat: -17.8786, lng: 36.8883 },
    { id: "nampula", name: "Loja Nampula", city: "Nampula", province: "Nampula", address: "Avenida Eduardo Mondlane, Nampula", phone: "+258 26 213 100", hours: "08:00 – 16:30", category: "Loja", lat: -15.1165, lng: 39.2666 },
    { id: "pemba", name: "Loja Pemba", city: "Pemba", province: "Cabo Delgado", address: "Avenida 25 de Setembro, Pemba", phone: "+258 272 20100", hours: "08:00 – 16:00", category: "Agência", lat: -12.9740, lng: 40.5178 },
    { id: "lichinga", name: "Loja Lichinga", city: "Lichinga", province: "Niassa", address: "Avenida Samora Machel, Lichinga", phone: "+258 271 20100", hours: "08:00 – 16:00", category: "Agência", lat: -13.3128, lng: 35.2406 },
    { id: "maxixe", name: "Agência Maxixe", city: "Maxixe", province: "Inhambane", address: "Avenida Independência, Maxixe", phone: "+258 293 30000", hours: "08:00 – 15:30", category: "Agência", lat: -23.8597, lng: 35.3472 }
  ];

  var NEWS = [
    { id: "n1", title: "Juntos pela Educação e Transformação Digital", date: "2025-10-01", image: "assets/img/noticia-unicef.jpg", excerpt: "A Tmcel defende a união de sinergias para que as TIC cheguem às comunidades mais vulneráveis, começando pela educação.", category: "Responsabilidade Social", body: "<p>A Tmcel – Moçambique Telecom defende a união de sinergias com parceiros como a UNICEF para que as tecnologias de informação e comunicação cheguem às comunidades mais vulneráveis. O ponto de partida é a educação: ligar escolas, formar professores e garantir que raparigas e rapazes tenham o mesmo acesso à internet.</p><p>O programa junta cobertura de rede, pacotes sociais e conteúdos digitais em português e em línguas locais. A empresa reitera que a transformação digital só é justa se ninguém ficar de fora — das zonas urbanas de Maputo às comunidades do interior.</p><p>Quem quiser saber mais sobre iniciativas de responsabilidade social pode contactar corporate@tmcel.mz ou visitar uma loja Tmcel.</p>" },
    { id: "n2", title: "Descobertas: Uma Jornada para a Autoestima", date: "2024-08-02", image: "assets/img/noticia-autoestima.jpeg", excerpt: "Iniciativa Tmcel que acompanha jovens numa jornada de autoestima, identidade e inclusão digital.", category: "Sociedade", body: "<p>Descobertas é uma jornada Tmcel que acompanha jovens na construção da autoestima, da identidade e da inclusão digital. Através de ateliers, mentoria e acesso à rede, os participantes aprendem a contar a sua história e a usar a internet com segurança.</p><p>A iniciativa reforça o compromisso da marca com a juventude moçambicana — o mesmo espírito do Pacote Jovem e do Malta M, agora no terreno, cara a cara.</p>" },
    { id: "n3", title: "Fórum das Indústrias Culturais e Criativas (FICC 2024)", date: "2024-07-23", image: "assets/img/noticia-ficc.jpeg", excerpt: "Segunda edição do FICC, com a Tmcel a apoiar as indústrias criativas moçambicanas.", category: "Eventos", body: "<p>A segunda edição do Fórum das Indústrias Culturais e Criativas contou com o apoio da Tmcel. Criadores, produtores e instituições discutiram como a conectividade acelera música, cinema, design e artes digitais em Moçambique.</p><p>A Tmcel disponibilizou cobertura e pacotes de dados para que o FICC pudesse ser acompanhado também fora da sala — um exemplo de como a rede serve a cultura nacional.</p>" },
    { id: "n4", title: "Tmcel aposta na democratização da internet", date: "2023-12-12", image: "assets/img/noticia-internet.jpeg", excerpt: "Pacotes acessíveis a partir de 2 MT para responder às necessidades crescentes de conectividade.", category: "Produto", body: "<p>Com vista a responder às crescentes necessidades de conectividade, a Tmcel reforçou a gama Netgiro com ofertas a partir de 2 MT. A ideia é simples: ninguém deve ficar sem dados por falta de saldo.</p><p>Os pacotes diários, semanais e mensais podem ser activados com *123# opção 2, ou neste website através de M-Cash — para si ou para outro número Tmcel.</p>" },
    { id: "n5", title: "Tmcel lança tecnologia 5G em parceria com a Huawei", date: "2022-03-28", image: "assets/img/noticia-5g.jpg", excerpt: "Lançamento da rede 5G em Maputo, com expansão faseada para outras capitais provinciais.", category: "Rede", body: "<p>A Tmcel lançou a tecnologia 5G em parceria com a Huawei, começando por Maputo. A nova geração de rede permite velocidades mais altas para BandaLarga móvel, MaxTurbo e uso empresarial.</p><p>A expansão segue de forma faseada para outras capitais provinciais, em paralelo com o reforço do 4G em todo o território.</p>" },
    { id: "n6", title: "Tmcel expande tecnologia 4G", date: "2021-11-01", image: "assets/img/noticia-4g.jpg", excerpt: "Projecto de modernização e expansão da cobertura 4G em todo o território nacional.", category: "Rede", body: "<p>No âmbito do projecto de expansão e modernização da rede, a Tmcel reforçou a cobertura 4G em Moçambique. O investimento melhora a experiência de Netgiro, Ilimitado e dos pacotes pós-pago, com mais estabilidade nas capitais e nos corredores nacionais.</p><p>A modernização continua, com novos sites e actualização de equipamentos em todas as províncias.</p>" }
  ];

  var FAQ = [
    { q: "Como activo um pacote Netgiro?", a: "Digite *123# no seu telemóvel, seleccione a opção 2 (Netgiro) e escolha o pacote. O valor é descontado do crédito principal." },
    { q: "Como consulto o saldo de dados?", a: "Digite *123#, escolha Netgiro e depois Saldo da Conta. Também pode ligar 100 (linha de cliente)." },
    { q: "Como peço o código PUK?", a: "No pré-pago, digite *123# e siga as perguntas de segurança. O PUK é enviado por SMS se acertar 3 de 4 perguntas. Limite: 3 pedidos por dia." },
    { q: "Como envio crédito com Tomalá?", a: "Envie para 082 a mensagem: 333 [número] [valor]. Mínimo 1 MT, máximo 100 MT por transferência, 500 MT/dia e 1.500 MT/mês. Ou use *123# opção Tomalá." },
    { q: "Qual é a tarifa nacional de voz e dados?", a: "Voz: 4,40 MT/min (0,073 MT/s). SMS: 0,02 MT. Dados avulso: 0,71 MT/MB. Valores publicados em Tarifas Nacionais." },
    { q: "Como subscrevo BandaLarga?", a: "Dirija-se a uma loja Tmcel ou ligue grátis 800 375 375. O serviço usa ADSL/VDSL/GPON sobre a linha fixa existente." },
    { q: "O que é o DUO?", a: "O DUO junta contrato pós-pago com a liberdade de recarregar como pré-pago. A partir de 600 MT inclui 10 números favoritos grátis. Mínimo 5 linhas (empresas)." },
    { q: "Como activo eSIM?", a: "Visite uma loja Tmcel com documento de identificação. O eSIM é associado ao seu número existente ou a um novo." },
    { q: "Como contacto o apoio ao cliente?", a: "Linha 100 (gratuita na rede Tmcel), WhatsApp 82 100 1000, email assistenciaaocliente@tmcel.mz ou corporate@tmcel.mz." },
    { q: "Os pacotes Netgiro acumulam?", a: "Sim, os MB são acumuláveis se continuar a adquirir o mesmo tipo de oferta. A validade conta a partir da última activação. Não inclui roaming." },
    { q: "Como activo o Ilimitado?", a: "Digite *171# ou *123# opção 3. Chamadas e SMS ilimitadas, com dados incluídos. Pré-pago e DUO. Não se renova automaticamente." },
    { q: "O que é o Malta M?", a: "Pacotes de voz on-net ou todas as redes, com SMS e MB. Active *136# ou *123#. Consulta de saldo: *180#." },
    { q: "Como funciona o Aceita lá?", a: "Marque 123 seguido do número Tmcel (12382XXXXXXX). O destino aceita com a tecla 1. Indisponível em roaming." },
    { q: "Como peço Empresta-la?", a: "*123# opção 4. Valores de 10 a 600 MT, pagos no próximo recarregamento. Elegível após 60 dias na rede ou recarga nos últimos 15 dias." },
    { q: "Como envio uma recarga com Giralá?", a: "Digite *444*código da recarga*número do destinatário#. O crédito chega com bónus e promoções, sem taxa." }
  ];

  var SERVICES = [
    { id: "s1", name: "Netgiro", desc: "Internet móvel a partir de 2 MT, para pré-pago e DUO.", href: "produto.html?id=netgiro", icon: "wifi" },
    { id: "s2", name: "Tomalá", desc: "Transfira crédito (1 a 100 MT) via *123# ou SMS 082.", href: "produto.html?id=tomala", icon: "send" },
    { id: "s3", name: "BandaLarga", desc: "Internet fixa ADSL/fibra, ilimitada ou com plafond.", href: "produto.html?id=bandalarga", icon: "home" },
    { id: "s4", name: "DUO Empresas", desc: "Contrato com liberdade de recarga. CUG e favoritos.", href: "produto.html?id=duo", icon: "building" },
    { id: "s5", name: "Pacote Jovem", desc: "Voz ilimitada, SMS e dados para o segmento jovem.", href: "produto.html?id=pacote-jovem", icon: "users" },
    { id: "s6", name: "eSIM", desc: "Cartão digital. Active na loja com o seu BI.", href: "lojas.html", icon: "sim" },
    { id: "s7", name: "Fixo / RDIS", desc: "Linha fixa, Linha Verde, Fax2Mail e factura detalhada.", href: "produto.html?id=rdis", icon: "phone" },
    { id: "s8", name: "Roaming", desc: "Tarifas de roaming pré e pós-pago. Apoio +258 20 611 239.", href: "produto.html?id=tarifas-roaming", icon: "globe" }
  ];

  var MENU = [
    {
      label: "Móvel",
      href: "servicos.html",
      columns: [
        {
          title: "Dados e Internet (pré-pago)",
          items: [
            { label: "Netgiro", href: "produto.html?id=netgiro" },
            { label: "Recargas GIGA", href: "produto.html?id=recargas-giga" },
            { label: "Tomalá", href: "produto.html?id=tomala" }
          ]
        },
        {
          title: "Voz (pré-pago)",
          items: [
            { label: "Ilimitado", href: "produto.html?id=ilimitado" },
            { label: "Pacote Jovem", href: "produto.html?id=pacote-jovem" },
            { label: "Recargas Móveis", href: "produto.html?id=recargas-moveis" },
            { label: "Pacotes PLUS", href: "produto.html?id=pacotes-plus" },
            { label: "Malta M", href: "produto.html?id=malta-m" },
            { label: "Bónus Aniversário", href: "produto.html?id=bonus-aniversario" },
            { label: "Troca Mais", href: "produto.html?id=troca-mais" }
          ]
        },
        {
          title: "Serviços (pré-pago)",
          items: [
            { label: "Aceita lá", href: "produto.html?id=aceita-la" },
            { label: "Chamadas em Conferência", href: "produto.html?id=conferencia" },
            { label: "10 Amigos / 3 Internacionais", href: "produto.html?id=10-amigos" },
            { label: "Bloqueio de Chamadas", href: "produto.html?id=bloqueio" },
            { label: "Empresta-la", href: "produto.html?id=empresta-la" },
            { label: "Giralá", href: "produto.html?id=girala" },
            { label: "Tomalá", href: "produto.html?id=tomala" },
            { label: "SMS", href: "produto.html?id=sms" }
          ]
        },
        {
          title: "Tarifas (pré-pago)",
          items: [
            { label: "Tarifas Internacionais", href: "produto.html?id=tarifas-internacionais" },
            { label: "Tarifas Roaming", href: "produto.html?id=tarifas-roaming" },
            { label: "Tarifas Nacionais", href: "produto.html?id=tarifas-nacionais" }
          ]
        },
        {
          title: "Dados e Internet (pós-pago)",
          items: [
            { label: "Aditivos de Dados Móveis", href: "produto.html?id=aditivos-dados" },
            { label: "MAX Controle", href: "produto.html?id=max-controle" },
            { label: "MaxTurbo", href: "produto.html?id=max-turbo" }
          ]
        },
        {
          title: "Voz (pós-pago)",
          items: [
            { label: "Pacotes MAIS", href: "produto.html?id=pacotes-mais" },
            { label: "DUO", href: "produto.html?id=duo" },
            { label: "Caução dos pacotes", href: "produto.html?id=caucao" },
            { label: "Aditivos de Voz Móvel", href: "produto.html?id=aditivos-voz" },
            { label: "Requisitos para Assinatura", href: "produto.html?id=requisitos" }
          ]
        },
        {
          title: "Serviços (pós-pago)",
          items: [
            { label: "Aceita lá", href: "produto.html?id=aceita-la" },
            { label: "10 Amigos / 3 Internacionais", href: "produto.html?id=10-amigos" },
            { label: "Bloqueio de Chamadas", href: "produto.html?id=bloqueio" },
            { label: "Giralá", href: "produto.html?id=girala" },
            { label: "Tomalá", href: "produto.html?id=tomala" }
          ]
        },
        {
          title: "Tarifas (pós-pago)",
          items: [
            { label: "Tarifas Roaming", href: "produto.html?id=tarifas-roaming" },
            { label: "Tarifas Internacionais", href: "produto.html?id=tarifas-internacionais" }
          ]
        }
      ]
    },
    {
      label: "Fixo",
      href: "servicos.html#fixo",
      columns: [
        {
          title: "Serviços",
          items: [
            { label: "BandaLarga", href: "produto.html?id=bandalarga" },
            { label: "Serviço Telefónico Fixo", href: "produto.html?id=fixo-pos-pago" },
            { label: "RDIS", href: "produto.html?id=rdis" },
            { label: "Linha Verde", href: "produto.html?id=linha-verde" },
            { label: "Factura Detalhada", href: "produto.html?id=factura-detalhada" },
            { label: "Fax2Mail", href: "produto.html?id=fax2mail" },
            { label: "PRAD", href: "produto.html?id=prad" }
          ]
        }
      ]
    },
    {
      label: "Pacotes",
      href: "pacotes.html",
      columns: []
    },
    {
      label: "Suporte",
      href: "suporte.html",
      columns: [
        {
          title: "Apoio",
          items: [
            { label: "eSIM", href: "lojas.html" },
            { label: "Lojas Físicas", href: "lojas.html" },
            { label: "Perguntas Frequentes", href: "suporte.html" },
            { label: "Contacto", href: "contacto.html" }
          ]
        }
      ]
    },
    { label: "Notícias", href: "noticias.html", columns: [] },
    { label: "Conta", href: "conta.html", columns: [] }
  ];

  var PRODUCTS = [
    {
      id: "netgiro",
      name: "Netgiro",
      group: "Dados e Internet (pré-pago)",
      ussd: "*123# opção 2",
      summary: "Pacote de dados para clientes pré-pago e DUO, a partir de 2 MT.",
      body: "<p>O Netgiro é o pacote de internet móvel da Tmcel, válido para pré-pago e DUO. Os MB são acumuláveis se continuar a adquirir o mesmo tipo de oferta. A validade conta a partir da última activação. Os dados não incluem roaming.</p><p>Activação: digite <strong>*123#</strong>, opção 2 (Netgiro) e escolha o pacote. Consulte o saldo no mesmo menu.</p>",
      catalog: "Netgiro",
      official: "https://www.tmcel.mz/netgiro/"
    },
    {
      id: "recargas-giga",
      name: "Recargas GIGA",
      group: "Dados e Internet (pré-pago)",
      ussd: "*123#",
      summary: "Recargas de dados: 1 GB / 3 GB / 6 GB com validade de 7, 15 ou 30 dias.",
      body: "<p>As Recargas GIGA creditam volume de dados no número Tmcel. Disponíveis em 30 MT (1 GB, 7 dias), 80 MT (3 GB, 15 dias) e 150 MT (6 GB, 30 dias).</p><p>Active via <strong>*123#</strong> ou recarregue um voucher GIGA num ponto de venda.</p>",
      catalog: "Recargas GIGA",
      official: "https://www.tmcel.mz/recargas-giga/"
    },
    {
      id: "tomala",
      name: "Tomalá",
      group: "Dados e Internet (pré-pago)",
      ussd: "*123# ou SMS 082",
      summary: "Envie parte do seu crédito a quem não tenha. Mínimo 1 MT, máximo 100 MT.",
      body: "<p>O Tomalá permite enviar crédito da conta principal. Valor mínimo 1 MT, máximo 100 MT por transferência, 500 MT/dia e 1.500 MT/mês.</p><ol><li>Digite <strong>*123#</strong> e escolha Tomalá; ou</li><li>SMS para <strong>082</strong>: <code>333 [número] [valor]</code> — exemplo: <code>333 82XXXXXXX 100</code>.</li></ol><p>O valor deve ser inteiro, sem casas decimais. Todas as transferências saem do crédito principal de quem partilha.</p>",
      official: "https://www.tmcel.mz/tomala/"
    },
    {
      id: "ilimitado",
      name: "Ilimitado",
      group: "Voz (pré-pago)",
      ussd: "*123# opção 3 ou *171#",
      summary: "Chamadas e SMS ilimitadas, com dados móveis incluídos. Pré-pago e DUO.",
      body: "<p>Os Pacotes Ilimitados Tmcel permitem chamadas e SMS ilimitadas dentro e fora da rede, mais dados móveis consoante o pacote. Validade diária, semanal, quinzenal ou mensal.</p><p>Activação: <strong>*171#</strong> ou <strong>*123#</strong> opção 3. Exige saldo na conta principal. Os pacotes não se renovam automaticamente e são acumuláveis.</p><p>Netgiro Ilimitado (voz + dados por hora/dia): *123# opção 2, depois opção 6, ou *180#.</p>",
      catalog: "Ilimitado",
      official: "https://www.tmcel.mz/ilimitado/"
    },
    {
      id: "pacote-jovem",
      name: "Pacote Jovem",
      group: "Voz (pré-pago)",
      ussd: "*212#",
      summary: "Oferta para 16–25 anos: voz, SMS e dados. Active *212#.",
      body: "<p>Se tens entre 16 e 25 anos, o Pacote Jovem junta voz ilimitada, SMS e dados. Active com <strong>*212#</strong>.</p><p>Os combinados vão de 50 MT (1 dia) a 2000 MT (30 dias). Consulte o catálogo para volumes exactos.</p>",
      catalog: "Pacote Jovem",
      official: "https://www.tmcel.mz/pacote-jovem/"
    },
    {
      id: "recargas-moveis",
      name: "Recargas Móveis",
      group: "Voz (pré-pago)",
      ussd: "*123# opção 3",
      summary: "GIRO: recargas de 10 a 2000 MT. As de 100 MT ou mais convertem-se em Ilimitado.",
      body: "<p>GIRO é falar à vontade. Recargas de 10, 20, 50, 100, 200, 300, 600 e 2000 MT.</p><p>As recargas de 100, 200, 300, 600 e 2000 MT podem converter-se em pacotes Ilimitados: active <strong>*171#</strong> (GIRO), <strong>*214#</strong> (DUO) ou *123# opção 3.</p>",
      official: "https://www.tmcel.mz/recargas-moveis/"
    },
    {
      id: "pacotes-plus",
      name: "Pacotes PLUS",
      group: "Voz (pré-pago)",
      ussd: "*171#",
      summary: "Giro PLUS e Giro MAX — voz, SMS e dados mensais a partir de 300 MT.",
      body: "<p>Giro PLUS (300 a 1500 MT) e Giro MAX 2000. Active com <strong>*171#</strong>. No DUO use também *214#.</p>",
      catalog: "Pacotes PLUS",
      official: "https://www.tmcel.mz/pacotes-plus/"
    },
    {
      id: "malta-m",
      name: "Malta M",
      group: "Voz (pré-pago)",
      ussd: "*136# ou *123# opção 6",
      summary: "Fale à vontade na rede Tmcel e outras redes, com SMS e MB incluídos.",
      body: "<p>Malta M: voz on-net ou todas as redes, SMS e megas. Active <strong>*136#</strong> ou *123# opção 6 (ou 9, conforme o menu).</p><ul><li>Consulta de saldo: *180#</li><li>Verificar se um número é Malta M: SMS <code>malta 82XXXXXXX</code> para 820015</li><li>Activar para outro número: *136# opção 2</li></ul><p>Válido no pré-pago e DUO. A validade não é acumulável; prevalece o maior pacote.</p>",
      official: "https://www.tmcel.mz/malta-m-2/"
    },
    {
      id: "bonus-aniversario",
      name: "Bónus Aniversário",
      group: "Voz (pré-pago)",
      ussd: "Automático",
      summary: "Gaste 1000 MT ou mais em 30 dias e receba 10% de bónus on-net.",
      body: "<p>Pré-pago e DUO: se gastar 1000 MT ou mais em 30 dias, recebe 10% desse valor em bónus. Quanto maior o gasto, maior o bónus.</p><ul><li>Só para chamadas dentro da rede Tmcel</li><li>Consome-se o bónus primeiro</li><li>Não pode ser usado a 24 e 31 de Dezembro</li><li>O remanescente expira no fim da promoção</li></ul>",
      official: "https://www.tmcel.mz/bonus-aniversario/"
    },
    {
      id: "troca-mais",
      name: "Troca Mais",
      group: "Voz (pré-pago)",
      ussd: "*123# opção 6",
      summary: "Troque SMS por bónus de voz ou megabytes.",
      body: "<p>Digite <strong>*123#</strong> opção 6 (Troca Mais): converter SMS em bónus de voz ou MB, ou consultar saldo.</p><table class='data'><thead><tr><th>SMS</th><th>Benefício</th></tr></thead><tbody><tr><td>100</td><td>10 MT de voz ou 10 MB</td></tr><tr><td>200</td><td>20 MT de voz ou 20 MB</td></tr><tr><td>500</td><td>50 MT de voz ou 50 MB</td></tr></tbody></table><p>Máximo 500 SMS/dia e 3000 SMS/mês. Bónus válido 1 dia. Pré-pago e DUO, só rede Tmcel.</p>",
      official: "https://www.tmcel.mz/troca-mais/"
    },
    {
      id: "aceita-la",
      name: "Aceita lá",
      group: "Serviços (pré-pago)",
      ussd: "Prefixo 123",
      summary: "Chamada a cobrar no destino. Exclusivo Tmcel.",
      body: "<p>Permite ligar sem saldo (ou com saldo, se preferir que o destino pague). Marque <strong>12382XXXXXXX</strong> ou <strong>12325882XXXXXXX</strong>.</p><p>Quem recebe ouve um anúncio: tecla 1 aceita, tecla 2 rejeita. Tarifário do destinatário. Pré e pós-pago. Bónus válidos. Indisponível em roaming.</p>",
      official: "https://www.tmcel.mz/aceita-la/"
    },
    {
      id: "conferencia",
      name: "Chamadas em Conferência",
      group: "Serviços (pré-pago)",
      ussd: "*43#",
      summary: "Até 6 pessoas na mesma chamada. Active chamadas em espera (*43#).",
      body: "<p>Reunião de até seis pessoas. Cancele os reenvios de chamada e active Chamadas em Espera com <strong>*43#</strong>.</p><ol><li>Ligue ao primeiro participante</li><li>Ponha em espera (tecla 2) e ligue ao segundo</li><li>Inclua na conferência com a tecla 3</li><li>Repita para os restantes</li></ol><p>Retirar participante: 1X (11, 12…). Conversa privada: 2X. Voltar à conferência: 3.</p>",
      official: "https://www.tmcel.mz/chamadas-em-conferencia/"
    },
    {
      id: "10-amigos",
      name: "10 Amigos Nacionais / 3 Internacionais",
      group: "Serviços (pré-pago)",
      ussd: "*123# opção 7",
      summary: "Tarifa reduzida para 10 números nacionais e 3 internacionais.",
      body: "<p><strong>10 amigos nacionais:</strong> com saldo ≥ 6 MT, paga 6 MT por 20 minutos; abaixo de 6 MT, 0,03 MT/s. *123# opção 7, opção 6, Adicionar. Números 82/83.</p><p><strong>3 amigos internacionais:</strong> voz e SMS 20% mais baratos. *123# opção 7, opção 7. Ou *138*indicativo*número#.</p><p>Pré-pago e DUO. Os números configuram-se de cada vez.</p>",
      official: "https://www.tmcel.mz/10-amigos-nacionais-3-amigos-internacionais/"
    },
    {
      id: "bloqueio",
      name: "Bloqueio de Chamadas",
      group: "Serviços (pré-pago)",
      ussd: "*33*código#",
      summary: "Bloqueie emissão ou recepção. Código inicial 0000.",
      body: "<ul><li>Nacionais enviadas: activar *33*código# · cancelar #33*código#</li><li>Internacionais enviadas: *331*código# / #331*código#</li><li>Nacionais recebidas: *35*código# / #35*código#</li><li>Recebidas em roaming: *351*código# / #351*código#</li><li>Cancelar todos: #330*código#</li><li>Alterar código: *03*330*actual*novo*novo#</li></ul><p>Verificar: *#43#. Altere o 0000 por razões de segurança.</p>",
      official: "https://www.tmcel.mz/bloqueio-de-chamadas/"
    },
    {
      id: "empresta-la",
      name: "Empresta-la",
      group: "Serviços (pré-pago)",
      ussd: "*123# opção 4",
      summary: "Empréstimo de 10 a 600 MT, pago no próximo recarregamento.",
      body: "<p>O cliente pré-pago pede 10, 20, 30, 40, 50, 100, 120, 150, 200, 300 ou 600 MT. O valor (mais taxa) desconta-se no primeiro recarregamento.</p><p>Elegibilidade: 60 dias na rede ou recarga nos últimos 15 dias. Menu *123# opção 4 (Emprestala): empréstimo, idioma e regras. Com o valor pode ligar, activar Malta M/Netgiro e partilhar crédito.</p>",
      official: "https://www.tmcel.mz/empresta-la/"
    },
    {
      id: "girala",
      name: "Giralá",
      group: "Serviços (pré-pago)",
      ussd: "*444*código*número#",
      summary: "Envie um voucher GIRO a outro número, com bónus e promoções.",
      body: "<p>Digite <strong>*444*código da recarga*número do destinatário#</strong>. O destinatário recebe SMS com o remetente e o valor.</p><p>Ao contrário do Tomalá, o crédito chega com bónus, SMS grátis e promoções em vigor. Sem taxa. Também a partir de um número pós-pago.</p>",
      official: "https://www.tmcel.mz/girala/"
    },
    {
      id: "sms",
      name: "SMS – Serviço de Mensagens Curtas",
      group: "Serviços (pré-pago)",
      ussd: "*123#",
      summary: "SMS automático em todos os cartões. Pacotes de 60 a 5000 mensagens.",
      body: "<p>Até 160 caracteres. Apague mensagens lidas para não saturar a caixa.</p><table class='data'><thead><tr><th>Preço</th><th>SMS</th><th>Validade</th></tr></thead><tbody><tr><td>2 MT</td><td>60</td><td>1 dia</td></tr><tr><td>3 MT</td><td>75</td><td>1 dia</td></tr><tr><td>5 MT</td><td>120</td><td>1 dia</td></tr><tr><td>10 MT</td><td>250</td><td>2 dias</td></tr><tr><td>20 MT</td><td>500</td><td>7 dias</td></tr><tr><td>50 MT</td><td>2400</td><td>30 dias</td></tr><tr><td>100 MT</td><td>5000</td><td>30 dias</td></tr></tbody></table>",
      catalog: "SMS",
      official: "https://www.tmcel.mz/sms-servico-de-mensagens-curtas/"
    },
    {
      id: "tarifas-internacionais",
      name: "Tarifas Internacionais",
      group: "Tarifas",
      ussd: "100",
      summary: "Voz e SMS para o estrangeiro. Consulte a tabela oficial ou a linha 100.",
      body: "<p>As tarifas internacionais variam por destino e são publicadas em tmcel.mz. Para o valor exacto ligue 100 ou visite uma loja.</p><p>Roaming pós-pago: +258 20 611 239 · pré-pago: +258 20 611 240 · linha fixa: +258 20 611 256.</p>",
      official: "https://www.tmcel.mz/tarifas-internacionais/"
    },
    {
      id: "tarifas-roaming",
      name: "Tarifas Roaming",
      group: "Tarifas",
      ussd: "+258 20 611 239",
      summary: "Uso da rede no estrangeiro. Os pacotes Netgiro não incluem roaming.",
      body: "<p>Apoio roaming: pós-pago +258 20 611 239 · pré-pago +258 20 611 240 · linha fixa +258 20 611 256.</p><p>Os MB dos pacotes Netgiro, Ilimitado e aditivos não são válidos em roaming. Confirme o tarifário do país de destino antes de viajar.</p>",
      official: "https://www.tmcel.mz/tarifas-roaming/"
    },
    {
      id: "tarifas-nacionais",
      name: "Tarifas Nacionais",
      group: "Tarifas",
      ussd: "*123#",
      summary: "Voz 4,40 MT/min · SMS 0,02 MT · dados avulso 0,71 MT/MB.",
      body: "<table class='data'><thead><tr><th>Serviço</th><th>Tarifa</th></tr></thead><tbody><tr><td>Voz por minuto</td><td>4,40 MT</td></tr><tr><td>Voz por segundo</td><td>0,073 MT</td></tr><tr><td>SMS nacional</td><td>0,02 MT</td></tr><tr><td>Dados avulso (MB)</td><td>0,71 MT</td></tr></tbody></table>",
      official: "https://www.tmcel.mz/tarifas-nacionais/"
    },
    {
      id: "aditivos-dados",
      name: "Aditivos de Dados Móveis",
      group: "Dados e Internet (pós-pago)",
      ussd: "Contrato",
      summary: "Extra de 2 a 33 GB no contrato pós-pago, com taxa mensal adicional.",
      body: "<p>Qualquer cliente pós-pago pode acrescentar MB ao pacote. Após o volume, 1 MT/MB. Não válido em roaming. Benefícios mensais, não cumulativos. Contratos 12, 24 ou 36 meses.</p>",
      catalog: "Aditivos Dados",
      official: "https://www.tmcel.mz/aditivos-de-dados-moveis/"
    },
    {
      id: "max-controle",
      name: "MAX Controle",
      group: "Dados e Internet (pós-pago)",
      ussd: "Loja / corporate@",
      summary: "Internet móvel com tecto de crédito. 15 a 260 GB, validade 60 dias.",
      body: "<p>Não gera excessos: quando os GB acabam, a voz continua em pré-pago (recarga GIRO/GIGA ou Netgiro/PLUS). Creditação automática após pagamento adiantado. Procedimentos iguais ao DUO.</p><p>Subscrição nas lojas ou corporate@tmcel.mz. IVA incluído.</p>",
      catalog: "MAX Controle",
      official: "https://www.tmcel.mz/max-controle/"
    },
    {
      id: "max-turbo",
      name: "MaxTurbo",
      group: "Dados e Internet (pós-pago)",
      ussd: "100 / loja",
      summary: "Internet ilimitada WTTx/LTE (CPE). Happy hour +5 Mbps das 17h às 07h.",
      body: "<p>Banda larga sem fios para zonas sem cobre/fibra. Contratos 6, 12 ou 24 meses. Caução igual à mensalidade. Cobertura LTE obrigatória. Equipamento (CPE) à vista ou até 12 prestações.</p>",
      catalog: "MaxTurbo",
      official: "https://www.tmcel.mz/max-turbo/"
    },
    {
      id: "pacotes-mais",
      name: "Pacotes MAIS",
      group: "Voz (pós-pago)",
      ussd: "Loja Tmcel",
      summary: "Pós-pago com minutos, SMS e dados. Caução igual à mensalidade.",
      body: "<p>Minutos para todas as redes. Benefícios mensais, não cumulativos. Sem roaming nem internacionais. Tomalá desconta na factura, não nos benefícios. IVA 16% incluído.</p><p>On-net: 3,50 MT/min (0,067 MT/s). Outras redes: 4,40 MT/min (0,08 MT/s). SMS 0,02 MT. MB 0,71 MT.</p>",
      catalog: "Pacotes MAIS",
      official: "https://www.tmcel.mz/pacotes-mais/"
    },
    {
      id: "duo",
      name: "DUO",
      group: "Voz (pós-pago)",
      ussd: "*214#",
      summary: "Contrato com liberdade de recarregar como Giro. Mínimo 5 linhas.",
      body: "<p>CUG grátis entre colaboradores. A partir de 600 MT: 10 números favoritos grátis. Pode aderir a promoções do pré-pago.</p><table class='data'><thead><tr><th>Pacote DUO (MT)</th><th>SMS</th><th>MB</th></tr></thead><tbody><tr><td>300 – 500</td><td>100</td><td>100</td></tr><tr><td>600 – 1000</td><td>300</td><td>500</td></tr><tr><td>1100 – 1500</td><td>500</td><td>1000</td></tr><tr><td>1600 – 2000</td><td>500</td><td>1000</td></tr><tr><td>2100 – 2500</td><td>500</td><td>2000</td></tr><tr><td>2600 – 3500</td><td>500</td><td>3000</td></tr><tr><td>3600 – 4500</td><td>500</td><td>3000</td></tr></tbody></table>",
      official: "https://www.tmcel.mz/duo/"
    },
    {
      id: "caucao",
      name: "Caução dos pacotes",
      group: "Voz (pós-pago)",
      ussd: "Loja Tmcel",
      summary: "Depósito igual à mensalidade, reembolsável no fim do contrato.",
      body: "<p>Pacotes MAIS e MAX: a caução nacional iguala a taxa mensal. Caução internacional/roaming: não aplicável nestas tabelas. Reembolsável após o contrato se todas as facturas estiverem pagas. IVA incluído.</p>",
      official: "https://www.tmcel.mz/caucao-dos-pacotes/"
    },
    {
      id: "aditivos-voz",
      name: "Aditivos de Voz Móvel",
      group: "Voz (pós-pago)",
      ussd: "Contrato",
      summary: "Minutos extra no contrato pós-pago, com taxa mensal adicional.",
      body: "<p>Acrescente minutos ao pacote MAIS/MAX. Subscrição nas lojas ou corporate@tmcel.mz. Os minutos extra seguem as mesmas regras do pacote base (sem roaming).</p>",
      official: "https://www.tmcel.mz/aditivos-de-voz-movel/"
    },
    {
      id: "requisitos",
      name: "Requisitos para Assinatura",
      group: "Voz (pós-pago)",
      ussd: "Loja Tmcel",
      summary: "Documentos para contrato pós-pago, DUO, BandaLarga e MaxTurbo.",
      body: "<ul><li>Pessoa singular: BI ou passaporte, NUIT, comprovativo de morada</li><li>Empresa: alvará, NUIT, credencial do representante, BI do signatário</li><li>Caução igual à mensalidade (quando aplicável)</li><li>eSIM / SIM: identificação na loja</li></ul><p>Confirme a lista actual na loja ou em corporate@tmcel.mz.</p>",
      official: "https://www.tmcel.mz/requisitos-para-assinatura/"
    },
    {
      id: "bandalarga",
      name: "BandaLarga",
      group: "Fixo",
      ussd: "800 375 375",
      summary: "Internet fixa ADSL, VDSL ou GPON. Ilimitada ou com plafond.",
      body: "<p>Usa a linha fixa existente (cobre/fibra). Voz, fax e Internet em simultâneo. Subscrição nas lojas ou linha gratuita <strong>800 375 375</strong>.</p><p>Contrato 12 meses com renovação automática. Extra: 0,15 MT/MB. Happy hour 17h–07h. Dependentes partilham dados no SIM pré-pago associado.</p>",
      catalog: "BandaLarga",
      official: "https://www.tmcel.mz/bandalarga2/"
    },
    {
      id: "fixo-pos-pago",
      name: "Serviço Telefónico Fixo Pós-Pago",
      group: "Fixo",
      ussd: "Loja Tmcel",
      summary: "Linha de voz fixa tradicional da Tmcel.",
      body: "<p>Comunicação de voz fixa, base da BandaLarga e da Linha Verde. Subscrição nas lojas e agências.</p>",
      official: "https://www.tmcel.mz/telefonico-pos-pago/"
    },
    {
      id: "rdis",
      name: "RDIS",
      group: "Fixo",
      ussd: "21 351 100",
      summary: "Rede Digital com Interligação de Serviços: voz, texto, imagem e dados na mesma linha.",
      body: "<p>Acesso básico (2×64 kbps + canal D 16 kbps) ou primário (até 30 canais). Ligação instantânea. Internet via NT-IP.</p><p>Serviços extra: chamada em espera, restrição de identificação, MSN, DDI, subendereçamento, portabilidade de terminal.</p><p>Pedidos: corporate@tmcel.mz · 21 351 100 · 82 217 3300.</p>",
      official: "https://www.tmcel.mz/rdis-rede-digital-com-integracao-de-servicos/"
    },
    {
      id: "linha-verde",
      name: "Linha Verde",
      group: "Fixo",
      ussd: "800 800 800",
      summary: "Número 800: o chamador não paga; a empresa destinatária assume o custo.",
      body: "<p>Exclusivo empresas/instituições. Exige pelo menos uma linha fixa Tmcel. Reencaminhamento para outros números fixos ou móveis.</p><p>Subscrição nas lojas. Info: 800 800 800, 800 123 123 ou linha_verde@tmcel.mz.</p>",
      official: "https://www.tmcel.mz/linha-verde/"
    },
    {
      id: "factura-detalhada",
      name: "Factura Detalhada",
      group: "Fixo",
      ussd: "Loja Tmcel",
      summary: "Extrato de chamadas da linha fixa, para controlo de custos.",
      body: "<p>Pedido nas lojas Tmcel ou à assistência a clientes. Indique o número da linha e o período.</p>",
      official: "https://www.tmcel.mz/factura-detalhada/"
    },
    {
      id: "fax2mail",
      name: "Fax2Mail",
      group: "Fixo",
      ussd: "faxsuporte@",
      summary: "Receba faxes no email, sem aparelho. Número 2101xxxx / 2102xxxx.",
      body: "<p>O fax chega em TIFF ou PDF. Número único, mesmo se mudar de cidade. Vários números por empresa. Sem papel, toner nem linha dedicada.</p><p>Adesão: carta a faxsuporte@tmcel.mz.</p>",
      official: "https://www.tmcel.mz/fax2mail/"
    },
    {
      id: "prad",
      name: "PRAD",
      group: "Fixo",
      ussd: "corporate@",
      summary: "Serviço institucional (clientes novos ou existentes).",
      body: "<p>Oferta para organismos públicos e empresas. Contacte corporate@tmcel.mz ou a Direcção Comercial.</p>",
      official: "https://www.tmcel.mz/servicos-prad/"
    }
  ];

  var TARIFFS = [
    { name: "Voz por minuto", value: "4,40 MT" },
    { name: "Voz por segundo", value: "0,073 MT" },
    { name: "SMS nacional", value: "0,02 MT" },
    { name: "Dados avulso (MB)", value: "0,71 MT" }
  ];

  global.TMCEL_DATA = {
    packages: PACKAGES,
    stores: STORES,
    news: NEWS,
    faq: FAQ,
    services: SERVICES,
    tariffs: TARIFFS,
    menu: MENU,
    products: PRODUCTS,
    company: {
      name: "Tmcel – Moçambique Telecom, SA",
      address: "Rua Belmiro Obadias Muianga, Nº 384, CP 1483 – Maputo",
      phone: "+258 21 351 100",
      hotline: "100",
      whatsapp: "82 100 1000",
      emailPerson: "assistenciaaocliente@tmcel.mz",
      emailCorp: "corporate@tmcel.mz"
    }
  };
})(window);
