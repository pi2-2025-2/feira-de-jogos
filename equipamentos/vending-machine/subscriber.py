import network
import time
import ujson as json
from machine import Pin
from umqtt.simple import MQTTClient

# ========= CONFIG =========

#WIFI_SSID = "Wokwi-GUEST"
#WIFI_PASSWORD = ""
WIFI_SSID = ""
WIFI_PASSWORD = ""

# MQTT_BROKER = "test.mosquitto.org"
MQTT_BROKER = "feira-de-jogos.dev.br"
MQTT_PORT = 1883
TOPIC_COMMAND = b"vending-machine/0/command"

MOTOR_PINS = {
    1: [26, 25, 33, 32],
    2: [14, 27, 12, 13],
    3: [5, 18, 19, 21],
}

PASSOS_POR_VOLTA = 400


# ========= STEPPER =========

class Stepper:
    def __init__(self, pins, steps_per_rev=PASSOS_POR_VOLTA):
        self.pins = [Pin(p, Pin.OUT) for p in pins]
        self.steps_per_rev = steps_per_rev

        self.seq = [
            (1, 0, 0, 0),
            (1, 1, 0, 0),
            (0, 1, 0, 0),
            (0, 1, 1, 0),
            (0, 0, 1, 0),
            (0, 0, 1, 1),
            (0, 0, 0, 1),
            (1, 0, 0, 1),
        ]

    def _write(self, step):
        for pin, val in zip(self.pins, step):
            pin.value(val)

    def steps(self, n, delay=8):
        seq_len = len(self.seq)
        idx = 0
        for _ in range(n):
            self._write(self.seq[idx])
            idx = (idx + 1) % seq_len
            time.sleep_ms(delay)
        self.release()

    def angle(self, degrees):
        steps_needed = int(abs(degrees) * self.steps_per_rev / 360)
        self.steps(steps_needed)

    def release(self):
        for p in self.pins:
            p.value(0)


STEPPERS = {p: Stepper(pins) for p, pins in MOTOR_PINS.items()}


# ========= WIFI =========

def wifi_connect():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Conectando ao Wi-Fi...")
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)
        while not wlan.isconnected():
            time.sleep_ms(500)
            print(".", end="")
        print()
    print("Wi-Fi conectado! IP:", wlan.ifconfig()[0])


# ========= MQTT =========

client = None

def on_message(topic, msg):
    print("Mensagem MQTT:", topic, msg)

    try:
        data = json.loads(msg.decode())
    except Exception as e:
        print("JSON inválido:", e)
        return

    product = int(data.get("product", 0))

    if product not in STEPPERS:
        print("Produto inválido:", product)
        return

    print("Liberando produto", product)
    try:
        STEPPERS[product].angle(360)
        print("Produto liberado.")
    except Exception as e:
        print("Erro ao girar motor:", e)


def mqtt_connect():
    global client
    client = MQTTClient("vending-0", MQTT_BROKER, MQTT_PORT)
    client.set_callback(on_message)
    client.connect()
    client.subscribe(TOPIC_COMMAND)
    print("MQTT conectado e inscrito em", TOPIC_COMMAND)


def loop():
    while True:
        client.check_msg()
        time.sleep_ms(50)


def main():
    wifi_connect()
    mqtt_connect()
    loop()


main()
