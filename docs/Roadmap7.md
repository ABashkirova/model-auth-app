# Подготовка
1. Изучить документацию GSON:
    1. [Как сериализовать объекты?](https://github.com/google/gson/blob/master/UserGuide.md#object-examples) - 30m
    2. [Как пометить, нужно ли сериализовать поле?](https://github.com/google/gson/blob/master/UserGuide.md#excluding-fields-from-serialization-and-deserialization) - 30m
    3. [Как использовать аннотацию @Expose?](https://github.com/google/gson/blob/master/UserGuide.md#gsons-expose) - 30m
2. Изучить документацию Providers guice : 
    1. Зачем используем провайдер? - Провайдер используется чтобы инжектить разные реализации интерфейса или если нужен какой-то код для инициализации. Также используется для отложенной инициализации - 30m
    2. Как создать провайдер и как связать его с классом (интерфейсом) - bind(...).toProvider(...) - 30m
    3. Как использовать аннотацию @Provides - Можно использовать в модуле вместо создания провайдера. Результат: умеем пользоваться аннотацией на простом примере из доки - 30m

# План R7
1. Добавить Guice в зависимости `app/build.gradle.kts` - 10m
2. Добавить GSON в зависимости `web/build.gradle.kts` - 10m
3. Добавить провайдер для сериализатора GSON - R7.2 -10m 
4. Добавить коннект к базе данных - R7.18 - 
    1. Избавиться от коннекта в Application - 10m
    2. Добавить инджекцию коннекта в dao классы - 10m
    3. Добавить инициализацию БД с помощью миграций в конфиг DI - 10m
5. Добавить `@Inject` к конструкторам DAO классов и сервисов и `Application` R7.18 - 10m
6. Добавить в DAO классы методы для будущих сервлетов:
    1. User: 
        - getAll(): List<DBUser> - R7.6 - 20m
        - getUserById(id: Int): DBUser - R7.7 - 20m
    3. Resource: 
        - getAll(): List<DBAccess>  - R7.8 - 20m
        - getById(d: Int): DBAccess - R7.9 - 20m
        - getByUserId(userId: Int): List<DBAccess> - R7.10 - 20m
    5. Activity: 
        - getALl(): List<DBActivity>   - R7.11 - 20m
        - getById(id: Int): DBActivity - R7.12 - 20m
        - getByAccessId(accessId: Int): DBActivity  - R7.13 - 20m
7. Добавить провайдер для сериализатора GSON - R7.2 - 20m
8. В провайдере инициализировать сериализатор с помощью `GsonBuilder().excludeFieldsWithoutExposeAnnotation().create()` - R7.14 - 20m
9. В конструктор сервлетов добавить сериализатор с аннотацией @Inject - 20m
10. В конструктор серервлетов добавить соответствующий dao:
    1. UserServlet - UserDAO - R7.3 - 10m
    2. AuthorityServlet - AccessDao - R7.4 - 10m
    3. ActivityServlet - ActivityDao - R7.5 - 10m
11. В dto классах пометить поля аннотацией @Expose - 20m
    1. кроме хэш и соль - R7.15
    2. Authority и  User / не будем делать - R7.16, - R7.17
12. Обработать запросы к сервлетам приложения: - 240m
    1. Сделать в сервлетах функции, преобразующие json из полученных данных - R7.1 - 20m
    2. Сделать проверку в методах `service` на наличие в запросе параметров:
        1. User:
            - без параметров - R7.6 - 20m
            - с параметром id - R7.7 - 20m
        2. Authority:
            - без параметров - R7.8 - 20m
            - с параметром id - R7.9 - 20m
            - с параметром userId - R7.10 - 20m
        3. Activity:
            - без параметров - R7.11 - 20m
            - с параметром id - R7.12 - 20m 
            - c параметром authorityId  - R7.13 - 20m
        4. Сделать проверку на приведение типа id, вывести ошибку bad request :) - 20m
    3. Сделать вызов соответствующих методов toJson сервлета для каждого случая - 20m
    4. Вывести json на страницу - 20m
