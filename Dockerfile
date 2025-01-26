FROM node:18 AS frontend
COPY ui/package.json /var/app/ui/package.json
COPY ui/package-lock.json /var/app/ui/package-lock.json
WORKDIR /var/app/ui
RUN npm ci
COPY ui/src /var/app/ui/src
COPY ui/public /var/app/ui/public
RUN npm run build

# analogicznie do terraforma...npm build wrzuc na terminal i postaraj sie wybudowac / pozniej mozna sprawdzic czy paczka na porcie 8000 wybuduje front...
# gdy juz sie wybuduje build to ponizej siegamy 

FROM python:3.9
COPY --from=frontend /var/app/ui/build /var/app/ui/build
COPY api/requirements.txt /var/app/api/requirements.txt
WORKDIR /var/app/api
RUN pip install --no-cache-dir --upgrade -r /var/app/api/requirements.txt 
COPY api /var/app/api
CMD ["uvicorn", "main:app", "--port", "80", "--host", "0.0.0.0"]

# tu uruchamiamy z dockera <-- jak to 'odbiera' Docker...
# spojrz i sprawdz wymagania package lock

#gdy jest juz produkcyjna aplikacja to mapowanie na 8000 i paczkowanie aby laczyc sie z backendem a nie portami frontu jest po to ze na produkcyjnej appce nie jestesmy juz w stanie developmentu, dlateg idziemy do main.py gdzie uruchomimy,,,


