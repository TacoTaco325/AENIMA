#AENIMA (Prueba tecnica)

- BACK-END : PHP, JSON
- FRONT-END : HTML, CSS, JAVA SCRIPT 
- LIBRERIAS: REACT JS (FRONT-END)
- DATABASE: MySQL
- PROGRAMAS: XAMPP
- Uso de API REST con endpoints

##Instrucciones
###Requisitos
- XAMPP

###BASE DE DATOS:
- 1 . Iniciar servicio MySQL en XAMPP
[![](https://user-images.githubusercontent.com/102692147/165369448-e7197dd9-c0a6-4728-a14b-a6451f7603e1.png)
- 2 . Crear base de datos llamada "aenimabd" en phpmyadmin
- 3 . Seleccionar  la base de datos "aenimabd"
- 4 . Importar el archivo llamado "aenimabd.sql" de la carpeta "database"
- Pestaña Importar
[![](https://user-images.githubusercontent.com/102692147/165367135-b1141c66-68a9-40e8-9f61-cb3235569b4c.png)

###BACK-END:
- 1 . Iniciar servicio de Apache
[![](https://user-images.githubusercontent.com/102692147/165369441-ce464030-d3dd-4b1b-8b5c-f00c1a0fbf11.png)
- 2 . Copiar y pegar la carpeta "back-end" en la siguiente ruta: "C:\xampp\htdocs"
- 3 . Ingresar a la ruta "C:\xampp\apache\conf\extra"
- 4 . Editar el archivo "httpd-vhosts.conf" y crear un VirtualHost con el siguiente codigo:
			<VirtualHost *:80>
				DocumentRoot "C:\xampp\htdocs\back-end"
    			ServerName api.com
			</VirtualHost>
- 5 . Ingresar a la ruta "C:\Windows\System32\drivers\etc"
- 6 . Editar el archivo "hosts" y reemplazar o ingresar lo siguiente:
		# localhost name resolution is handled within DNS itself.
			#	127.0.0.1       localhost
    		127.0.0.1 (IP LOCAL)       api.com(Nombre del VirtualHost)
			#	::1             localhost
- 6 . Detener e Iniciar el servicio de Apache Nuevamente

###FRONT-END:
- 1 . En la carpeta "front-end" abrir cmd, nuevo terminal , o git bash here
- 2 . Ingresar el siguiente comando:
			npm start
o 
			yarn start
#Vista Previa del Sitio Web
[![](https://user-images.githubusercontent.com/102692147/165370909-e996ff25-9cfa-484f-aa10-5ad1924f21a6.png)
