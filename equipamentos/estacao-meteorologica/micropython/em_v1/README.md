# Versão 1 da estação meteorológica.

### Objetivo:
- Aprimorar a versão 0 com sensores melhores para garantir mais qualidade e confiabilidade dos dados coletados.
- Adicionar os sensores requisitados que não foram instalados na v0.

---

# Temperatura:
- [x] LM75
- [x] DHT11
- [x] DS18B20
- [x] SHT35
- [x] SHT85
- [x] STH31
- [ ] HTU21D
- [x] ATH25
- [x] LM35
- [x] LM35DZ
- [x] MCP9808
- [x] DHT22
- [ ] BMP280
- [ ] BME280
- [ ] TMP36

# SHT31-DIS - Sensor Digital de Temperatura e Umidade

### Informações Gerais:
- Interface: I2C (clock máximo de 1 MHz)
- Endereços I2C:
	 - 0x44 (ADDR conectado ao GND)
	 - 0x45 (ADDR conectado ao VDD)
### Temperatura:
- Faixa: -40°C a 125°C
- Precisão: ±0.2°C (entre 0ºC e 90ºC, typ.) e ±0.7°C (máx.)
- Resolução: 0.01ºC
- Deriva de longo prazo: < 0,03°C/ano
### Umidade Relativa:
- Faixa: 0% a 100 %
- Precisão (a 25°C): ±2% (typ.) e ±3% (máx.)
- Resolução: 0.01%
- Deriva de longo prazo: < 0,25%/ano
### Tipos de Encapsulamento:
- ***open-cavity DFN***
### Características Elétricas:
- Tensão de operação: 2,15V a 5,5V
- Consumo de corrente (Ativo):  600µA (typ.) e 1,5mA (máx)
- Consumo de corrente (Standby): 0,2µA (typ.) e 6µA (máx.)
### Tempo de Resposta:
- Umidade: ~8 segundos (1/e 63%)
- Temperatura: ~4 segundos (1/e 63%)
- Comunicação: ~4 ms para pacote completo via I2C

---
# SHT35-DIS - Sensor Digital de Temperatura e Umidade

### Informações Gerais:
- Interface: I2C (clock máximo de 1 MHz)
- Endereços I2C:
	 - 0x44 (ADDR conectado ao GND)
	 - 0x45 (ADDR conectado ao VDD)
### Temperatura:
- Faixa: -40°C a 125°C
- Precisão: ±0.1°C (entre 20ºC e 60ºC, typ.) e ±0.6°C (máx.)
- Resolução: 0.01ºC
- Deriva de longo prazo: < 0,03°C/ano
### Umidade Relativa:
- Faixa: 0% a 100 %
- Precisão (a 25°C): ±1,5% (typ.) e ±3% (máx.)
- Resolução: 0,01%
- Deriva de longo prazo: < 0,25%/ano
### Tipos de Encapsulamento:
- ***open-cavity DFN***
### Características Elétricas:
- Tensão de operação: 2,15V a 5,5V
- Consumo de corrente (Ativo):  600µA (typ.) e 1,5mA (máx)
- Consumo de corrente (Standby): 0,2µA (typ.) e 6µA (máx.)
### Tempo de Resposta:
- Umidade: ~8 segundos (1/e 63%)
- Temperatura: ~4 segundos (1/e 63%)
- Comunicação: ~4 ms para pacote completo via I2C

---
# SHT85 - Sensor Digital de Temperatura e Umidade

### Informações Gerais:
- Interface: I2C (clock máximo de 1 MHz)
### Temperatura:
- Faixa: -40°C a 105°C
- Precisão: ±0.1°C (entre 20ºC e 50ºC, typ.) e ±0.6°C (máx.)
- Resolução: 0,01ºC
- Deriva de longo prazo: < 0,03°C/ano
### Umidade Relativa:
- Faixa: 0% a 100 %
- Precisão (a 25°C): ±1,5% (typ.) e ±3% (máx.)
- Resolução: 0,01%
- Deriva de longo prazo: < 0,25%/ano
### Tipos de Encapsulamento:
- ***IP67 housing with hydrophobic membrane filter***
### Características Elétricas:
- Tensão de operação: 2,15V a 5,5V
- Consumo de corrente (Ativo):  600µA (typ.) e 1,5mA (máx)
- Consumo de corrente (Standby): 0,2µA (typ.) e 12µA (máx.)
### Tempo de Resposta:
- Umidade: ~8 segundos (1/e 63%)
- Temperatura: ~4 segundos (1/e 63%)
- Comunicação: ~4 ms para pacote completo via I2C


---
# LM75 - Sensor Digital de Temperatura

### Informações Gerais:
- Interface: I2C standard (até 100 kHz).
- Endereços I2C: configuráveis via pinos A0, A1, A2 (até 8 dispositivos).
### Temperatura:
- Faixa: -55°C a 125°C
- Precisão:
	- ±2.0 °C (de -25°C a 100°C)
	- ±3.0 °C (de -55°C a 125°C)
- Resolução: 0.5 °C (9 bits)
### Tipos de Encapsulamento:
- **SOP-8** (SMD)
- **MSOP-8** (SMD)
### Características Elétricas:
- Tensão de operação: 3,0V a 5,5V
- Consumo de corrente (Ativo):  250µA (typ.) e 1mA (máx.)
- Consumo de corrente (Standby): 4µA (3V, máx.) e 6µA (5V, máx.)
### Tempo de Resposta:
- Tempo de conversão: ~100 ms
- Comunicação I2C: ~100 µs para dados

---
# DS18B20 - Sensor Digital de Temperatura
### Informações Gerais:
- Interface: 1-Wire (requere apenas um fio de dados + GND)
### Temperatura:
- Faixa: -55°C a 125°C
- Precisão: ±0.5 °C (de -10°C a 85°C) e ±2ºC (entre -55ºC e 125ºC)
- Resolução configurável: 9 a 12 bits
	 - 9 bits: 0.5°C
	 - 10 bits: 0.25°C
	 - 11 bits: 0.125°C
	 - 12 bits: 0.0625°C
### Tipos de Encapsulamentos:
-  **TO-92** (3 pinos)
-  **SOIC-8** (SMD)
-  Encapsulamento a Prova D’água
### Características Elétricas:
- Tensão de operação: 3,0V a 5,5V
- Consumo de corrente (Standby): 0,75µA (typ.) e 1,0µA (máx.) 
- Consumo de corrente (Ativo): 1,0mA (typ.) e 1,5mA (máx.)
### Tempo de Resposta:
- Conversão temperatura: ~750 ms (resolução máxima)
- Comunicação 1-Wire: alguns ms para dados

---
# LM35 - Sensor Analógico de Temperatura
### Informações Gerais:
- Interface: Analógica
### Temperatura:
- Faixa: -55°C a 150°C
- Precisão: ±0.4°C (a 25ºC, typ.) e ±1.5ºC (máx.)
- Resolução: Dependente do ADC da ESP32 (12 bits, resolução teórica de 0,08ºC)
- não-linearidade: ±0,3 °C (typ.) e ±0,5 °C (máx.)
### Tipos de Encapsulamentos:
-  **TO-46**
-  **SOIC-8** (SMD)
-  **TO-92** 
-  **TO-220**
### Características Elétricas:
- Tensão de operação: 4V a 30V
- Consumo de corrente (Constante): 56µA (5V e 25ºC, typ.) e 161µA (máx.) 
### Tempo de Resposta:
- Quase instantâneo (sinal analógico)
- Conversão ADC depende do microcontrolador (~µs a ms)

---
# LM35DZ - Sensor Analógico de Temperatura
### Informações Gerais:
- Interface: Analógica
### Temperatura:
- Faixa: 0°C a 100°C
- Precisão: ±0.6°C (a 25ºC, typ.) e ±2,0ºC (máx.)
- Resolução: Dependente do ADC da ESP32 (12 bits, resolução teórica de 0,08ºC)
- não-linearidade: ±0,2 °C (typ.) e ±0,5 °C (máx.)
### Tipos de Encapsulamentos:
-  **TO-46**
-  **SOIC-8** (SMD)
-  **TO-92** 
-  **TO-220**
### Características Elétricas:
- Tensão de operação: 4V a 30V
- Consumo de corrente (Constante): 56µA (5V e 25ºC, typ.) e 141µA (máx.) 
### Tempo de Resposta:
- Quase instantâneo (sinal analógico)
- Conversão ADC depende do microcontrolador (~µs a ms)

---
# DHT11 - Sensor Digital de Temperatura e Umidade

### Informações Gerais:
- Interface: Serial (Single-wire, bidirecional)
- Taxa de transmissão: ~10kbps
### Temperatura:
- Faixa: 0°C a 50°C
- Precisão: ±1ºC (mín.) e ±2°C (máx.)
- Resolução: 8 bits (1ºC)
### Umidade Relativa:
- Faixa: 30% a 90% (0ºC), 20% a 90% (25ºC) e 20% a 80% (50ºC)
- Precisão: ±4% (25ºC) e ±5% (0-50ºC)
- Resolução: 8 bits (1%)
- Deriva de longo prazo: ±1%/ano
### Tipos de Encapsulamento:
- **4 Pin Single Row**
### Características Elétricas:
- Tensão de operação: 3V a 5,5V
- Consumo de corrente (Ativo):  0,5mA (mín.) e 2,5mA (máx)
- Consumo de corrente (Standby): 100µA (mín.) e 150µA (máx.)
### Tempo de Resposta:
- Umidade: 6 a 15 segundos (1/e 63%)
- Temperatura: 6 a 30 segundos (1/e 63%)
- Comunicação: ~4 ms para pacote completo

---
# DHT22 - Sensor Digital de Temperatura e Umidade

### Informações Gerais:
- Interface: Serial (Single-wire, bidirecional)
- Tempo para leitura: 2s
- Taxa de transmissão: ~8kbps
### Temperatura:
- Faixa: -40°C a 80°C
- Precisão: <±0,5ºC
- Resolução: 0,1ºC
### Umidade Relativa:
- Faixa: 0% a 100%
- Precisão: ±2% (typ.) e ±5% (máx.)
- Resolução: 0,1%
- Deriva de longo prazo: ±0,5%/ano
### Tipos de Encapsulamento:
- **4 Pin Single Row**
### Características Elétricas:
- Tensão de operação: 3,3V a 6V
- Consumo de corrente (Ativo):  1mA (mín.) e 1,5mA (máx)
- Consumo de corrente (Standby): 40µA (mín.) e 50µA (máx.)
### Tempo de Resposta:
- Umidade e temperatura: ~2 segundos (mínimo entre leituras)
- Comunicação: ~5 ms para pacote completo

---
# MCP9808 - Sensor Digital de Temperatura

### Informações Gerais:
- Interface: I2C standard (até 400 kHz).
- Endereços I2C: configuráveis via pinos A0, A1, A2
### Temperatura:
- Faixa: -40°C a 125°C
- Precisão: ±0,25 °C (de -25°C a 100°C) e ±1,0 °C (máx.)
- Resolução configurável: +0.5°C, +0.25°C, +0.125°C, +0.0625°C
### Tipos de Encapsulamento:
- **8-Lead DFN** (SMD)
- **MSOP-8** (SMD)
### Características Elétricas:
- Tensão de operação: 2,7V a 5,5V
- Consumo de corrente (Ativo):  200µA (typ.) e 400µA (máx.)
- Consumo de corrente (Standby): 0,1µA (typ.) e 2µA (máx.)
### Tempo de Conversão:
- 0.5°C (9 bits): **30 ms**
- 0.25°C (10 bits): **65 ms**
- 0.125°C (11 bits): **130 ms**
- 0.0625°C (12 bits): **250 ms**


---
# ATH25 - Sensor Digital de Temperatura e Umidade

### Informações Gerais:
- Interface: I2C standard (até 100kHz)
- Tempo para leitura: 2s
### Temperatura:
- Faixa: -40°C a 80°C
- Precisão: ±0,3ºC (typ.) e ±2ºC (máx.)
- Resolução: 0,01ºC
- Deriva de longo prazo: ±0,1ºC/ano
### Umidade Relativa:
- Faixa: 0% a 100%
- Precisão: ±2% (typ.) e ±6% (máx.)
- Resolução: 0.024%
- Deriva de longo prazo: <1%/ano
### Tipos de Encapsulamento:
- ***SMD de 4 pinos***
### Características Elétricas:
- Tensão de operação: 2,2V a 5,5V
- Consumo de corrente (Ativo):  980µA
- Consumo de corrente (Standby): 250nA
### Tempo de Resposta:
- Umidade: <8 segundos (1/e 63%)
- Temperatura: 5 a 30 segundos (1/e 63%)

---
