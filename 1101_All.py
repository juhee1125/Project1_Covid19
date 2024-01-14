import pandas as pd
import matplotlib.pyplot as plt

from matplotlib import font_manager, rc
font_path = "C:\Windows\\Fonts\\NGULIM.TTF"
font = font_manager.FontProperties(fname=font_path).get_name()
rc('font', family=font)

df = pd.read_csv("최종 데이터.csv")
df["date"] = pd.to_datetime(df["date"])

spot_ = '전세계'
d_ = df[(df["location"]==spot_) & (df["date"].dt.month==9)]
plt.figure(figsize=(10,5))
plt.title("실시간 %s 코로나 그래프" % spot_, fontsize=15)
plt.plot(d_["date"], d_["total_cases"], "-", color='grey', label=str(spot_))
plt.grid()
plt.legend(fontsize=13)
plt.xticks(rotation=90)
plt.show()