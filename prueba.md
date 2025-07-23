# Documentación Avanzada Microservicio Delivery Zonas

## 1. Descripción general

Este microservicio gestiona zonas de reparto y repartidores, permitiendo la administración, consulta y asignación de zonas, así como la búsqueda por proximidad. Está diseñado para integrarse con otros microservicios (autenticación, pedidos, usuarios) y con un frontend en Angular.

---

## 2. Arquitectura y tecnologías

- **NestJS**: Framework modular y escalable para Node.js.
- **TypeORM**: ORM para PostgreSQL, facilita la gestión de entidades y relaciones.
- **PostgreSQL**: Base de datos relacional.
- **JWT**: Seguridad y permisos.
- **Class-validator / class-transformer**: Validación y transformación de datos.
- **CORS**: Permite la comunicación segura con el frontend.
- **Jest**: Pruebas unitarias y e2e.

---

## 3. Estructura de carpetas y archivos

### src/
- **app.module.ts**: Configuración principal del módulo.
- **main.ts**: Arranque de la app, configuración de CORS y validaciones.
- **common/**: DTOs y utilidades compartidas.
- **deliveryPerson/**: Lógica de repartidores.
- **zone/**: Lógica de zonas.
- **middlewares/**: Seguridad y permisos.
- **entities/**: Exportación de entidades.

### test/
- Pruebas e2e y configuración de Jest.

### Otros archivos
- **package.json**: Dependencias y scripts.
- **tsconfig.json**: Configuración de TypeScript.
- **README.md**: Descripción y guía rápida.

---

## 4. Explicación de cada módulo y carpeta

### deliveryPerson/
- **deliveryPerson.controller.ts**: Endpoints para crear, actualizar, buscar y asignar zonas a repartidores.
- **deliveryPerson.entity.ts**: Entidad con los campos del repartidor y relación con zonas.
- **deliveryPerson.service.ts**: Lógica de negocio, asignación de zonas, búsqueda por proximidad, etc.
- **dto/**: DTOs para cada operación (crear, actualizar, buscar, asignar).

### zone/
- **zone.controller.ts**: Endpoints para crear, actualizar y consultar zonas.
- **zone.entity.ts**: Entidad de zona, con nombre, ubicación y radio.
- **zone.service.ts**: Lógica de negocio de zonas.
- **dto/**: DTOs para crear, actualizar y asignar zonas.

### middlewares/
- **auth.middleware.ts**: Verifica el JWT en cada request protegida.
- **decorators/permissions.decorator.ts**: Permite definir permisos requeridos en los endpoints.

---

## 5. Explicación de DTOs, entidades y servicios

### Ejemplo de DTO: FindByProximityDeliveryPerson
```typescript
export class FindByProximityDeliveryPerson extends PaginationDto {
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @IsNumber()
    radius: number; // Radio en km
}
```

### Ejemplo de entidad: Zone
```typescript
@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  @Column('float')
  radius: number;

  @ManyToMany(() => DeliveryPersonEntity, deliveryPerson => deliveryPerson.zones)
  deliveryPersons: DeliveryPersonEntity[];
}
```

### Relaciones
- **Un repartidor puede estar en varias zonas** (ManyToMany).
- **Una zona puede tener varios repartidores** (ManyToMany).

---

## 6. Ejemplos de endpoints y uso desde el frontend

### Crear repartidor
```http
POST /delivery
Body:
{
  "name": "Juan Perez",
  "location": { "lat": -34.60, "lng": -58.38 }
}
```

### Buscar repartidores por proximidad
```http
POST /delivery/findByProximity
Body:
{
  "location": { "lat": -34.60, "lng": -58.38 },
  "radius": 5
}
```

### Asignar zona a repartidor
```http
POST /delivery/1/assignZone
Body:
{
  "zoneIds": [2, 3]
}
```

### Consultar zonas de un repartidor
```http
GET /delivery/1/zones
```

### Eliminar zona de un repartidor
```http
DELETE /delivery/1/zone/2
```

---

## 7. Seguridad y microservicio JWT

- El JWT se envía en la cabecera `Authorization: Bearer <token>`.
- El middleware valida el token y extrae los permisos.
- El decorador `@Permissions(['delivery_create'])` protege los endpoints.
- Si el usuario no tiene permisos, recibe un error 403.

---

## 8. Integración con otros microservicios

- **Microservicio de autenticación**: Emite el JWT y gestiona usuarios.
- **Microservicio de pedidos**: Puede consultar zonas y repartidores para asignar pedidos.
- **Microservicio de usuarios**: Relaciona usuarios con repartidores.

---

## 9. Diagramas y ejemplos de flujo

### Diagrama de arquitectura

```
[Frontend Angular] <--HTTP--> [Microservicio Delivery Zonas (NestJS)] <--TypeORM--> [PostgreSQL]
         |                                 ^
         |                                 |
         v                                 |
[Microservicio JWT / Auth] <---------------|
```

### Ejemplo de flujo: Asignar zona a repartidor

1. El usuario selecciona un repartidor y una zona en el frontend.
2. El frontend envía un POST a `/delivery/:id/assignZone` con el body:
   ```json
   {
     "zoneIds": [1, 2, 3]
   }
   ```
3. El backend valida el JWT y los permisos.
4. El backend asigna las zonas al repartidor y responde con el objeto actualizado.

---

## 10. Recomendaciones para escalar y trabajar en equipo

- Usar control de versiones (Git) y ramas para desarrollo colaborativo.
- Documentar los endpoints con Swagger o Postman.
- Mantener los DTOs y entidades sincronizados con la base de datos.
- Realizar pruebas unitarias y e2e para cada módulo.
- Separar la lógica de negocio en servicios y mantener los controladores simples.
- Usar variables de entorno para configuración sensible (puertos, credenciales).
- Revisar y actualizar los permisos y roles según las necesidades del negocio.

---

¿Necesitas que agregue ejemplos de pruebas, configuración de Swagger, o detalles sobre la base de datos y migraciones? Si tienes alguna duda específica sobre la integración, la seguridad o el funcionamiento interno, dime y lo incluyo en la documentación.
