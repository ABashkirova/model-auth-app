# План R6
1. Изучить документацию guice - 3h
    1. ServletModule  - 2h
        - Как регистрировать сервлеты? Результат: как проинджектить сервлет - 1h
        - Чем отличается serve от filter? - Результат: знаем зачем использовать serve и когда нужен filter - 1h
    2. CustomInjections - 30m
        - Как проинджектить logger? Результат: знаем как добавить иньекцию логгера 30m
    - Что такое провайдер? - Результат: знаем как использовать в методах и классах - 15m
    - Что делает метод service? Результат: знаем как переопределить поведение методов doGet/doPost внутри него  - 15m
2. Добавить зависимость в gradle - guice -5m
3. Добавить GuiceServlet в web.xml - 5m
4. Написать GuiceServletConfig - R6.1 - 15m
    - создать новый класс GuiceServletConfig
    - написать функцию configureServlets с указанием путей
5. Добавить инджекцию логгера - R6.2 - 30m
    - добавить классы Log4JTypeListener, Log4JMembersInjector
    - добавить аннатацию Ingect в класс сервлета echo
6. Написать новый сервлет UserServlet - К6.3 - 35m
    1. добавить слушание configureServlets /ajax/user - 5m
    2. переопредлить поведение service с принтом полученных данных - 30m
7. Написать новый сервлет AuthorityServlet - К6.4 - 15m
    1. добавить слушание configureServlets /ajax/authority - 5m
    2. переопредлить поведение service с принтом полученных данных - 10m
8. Написать новый сервлет Activity - К6.5 - 15m
    1. добавить слушание configureServlets /ajax/activity - 5m
    2. переопредлить поведение service с принтом полученных данных 10m
