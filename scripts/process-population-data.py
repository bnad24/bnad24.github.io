import pandas as pd

df = pd.read_excel("Bul_MO_2023.xlsx", sheet_name="Таб_1", usecols=[0,1])\
    .rename(columns={"Содержание": "region", "Unnamed: 1": "population"})

df = df[4:]

with open("public/data/population.json", "w") as f:
    f.write(df.to_json(orient="records", force_ascii=False, indent=2))
