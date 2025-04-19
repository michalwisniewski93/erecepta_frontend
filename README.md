# Jesteś w repozytorium 'erecepta_frontend'. To repozytorium zawiera front-end aplikacji e-recepta.

# Aby pobrać ten projekt na swój komputer i przetestować działanie.
# 1.)pobierz to repozytorium poleceniem:
# git clone https://github.com/michalwisniewski93/erecepta_frontend.git
# 2.)następnie wpisz komendę 
# npm install 
# by zainstalowały się dependencies i pobrał folder node-modules
# 3.)następnie wpisz komendę 
# npm start 
# by odpalić serwer przygotowany przez środowisko create-react-app 


# frontend powinien 'odpalić' się Tobie pod adresem http://localhost:3000

# Ale aby testować aplikację, potrzebujesz jeszcze backendu

# Backend znajduje się w repozytorium o adresie 'erecepta_backend'. 

# 1.) Pobierz to repozytorium poleceniem
# git clone https://github.com/michalwisniewski93/erecepta_backend.git
# 2.) wpisz komendę 
# npm install 
# aby zainstalowały się dependencies i pobrał folder node modules
# 3.) odpal osobną konsolę
# 4.) wpisz node index.js 
# 5.) poczekaj chwilę aż otrzymasz potwierdzenie że połączenie zostało nawiązane również z bazą danych
# Baza danych jest w chmurze na MongoDB Atlas, więc nie musisz jej dodatkowo pobierać.
# 6.) backend działać powinien pod adresem http://localhost:5000 (tak jest podpięte na frontendzie).

# Jeżeli masz zajęte te porty i nie możesz ich odblokować  na maszynie lokalnej to wejdź do repozytorium:
# erecepta-frontend-vercel
# i analogicznie dla backendu
# erecepta-backend-vercel
# w tych repozytoriach znajduje się wersja frontendu i analogicznie backendu już podpięta pod chmurę w vercel.
