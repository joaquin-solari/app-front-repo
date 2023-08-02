# Usa una imagen base de Nginx
FROM nginx

WORKDIR	/usr/share/nginx/html

# Copia los archivos del proyecto a la carpeta de contenido predeterminada de Nginx
#COPY ~/proyectoTomi/mi-app 
COPY index.js index.html styles.css /usr/share/nginx/html

# Comando que se ejecutará cuando inicies el contenedor
CMD ["nginx", "-g", "daemon off;"]
