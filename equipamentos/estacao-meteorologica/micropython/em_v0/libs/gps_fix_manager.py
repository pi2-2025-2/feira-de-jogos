import ujson as json
import os
from math import radians, cos, sin, sqrt, atan2

class GPSFixManager:
    def __init__(self, arquivo_fix="fix.json", limite_metros=500, tentativas=3):
        self.arquivo_fix = arquivo_fix
        self.limite_metros = limite_metros
        self.tentativas = tentativas

    def distancia_metros(self, lat1, lon1, lat2, lon2):
        R = 6371000  # raio da Terra em metros
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return R * c

    def salvar_fix(self, dados):
        try:
            with open(self.arquivo_fix, "w") as f:
                json.dump(dados, f)
        except Exception as e:
            print("Erro ao salvar fix:", e)

    def carregar_fix(self):
        try:
            if self.arquivo_fix in os.listdir():
                with open(self.arquivo_fix, "r") as f:
                    return json.load(f)
        except Exception as e:
            print("Erro ao carregar fix:", e)
        return None

    def fix_valido(self, fix):
        if fix is None:
            return False
        try:
            lat = float(fix.get("latitude"))
            lon = float(fix.get("longitude"))
            if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
                return False
            # Pode adicionar mais validações se quiser (ex: altitude numérica)
            return True
        except:
            return False

    def pegar_fix_valido(self, gps_data_func):
        for _ in range(self.tentativas):
            fix = gps_data_func()
            if self.fix_valido(fix):
                return fix
        return None

    def atualizar_fix(self, gps_data):
        if not self.fix_valido(gps_data):
            print("Fix inválido, não será atualizado")
            return False

        fix_antigo = self.carregar_fix()
        if fix_antigo is None:
            self.salvar_fix(gps_data)
            print("Primeiro fix salvo:", gps_data)
            return True

        distancia = self.distancia_metros(
            float(fix_antigo["latitude"]), float(fix_antigo["longitude"]),
            float(gps_data["latitude"]), float(gps_data["longitude"])
        )

        if distancia > self.limite_metros:
            self.salvar_fix(gps_data)
            print(f"Fix atualizado. Distância entre fixes: {distancia:.2f} m")
            return True
        else:
            print(f"Mudança menor que {self.limite_metros} metros ({distancia:.2f} m). Fix mantido.")
            return False

