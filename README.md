# Proyecto Banking DDD - Naive Bank Account

Este proyecto implementa un sistema bancario siguiendo los principios de **Domain-Driven Design (DDD)** basado en el Codely Aggregate Design Blueprint para "Naive Bank Account".

## 📋 Descripción del Agregado

**Naive Bank Account** es un agregado que modela de manera ingenua una cuenta bancaria personal. La cuenta, una vez abierta, agregará todas las transacciones hasta que se cierre (posiblemente años después).

### Propiedades
- **Id**: UUID único de la cuenta
- **Balance**: Saldo actual de la cuenta
- **Currency**: Moneda de la cuenta (GBP, EUR, USD)
- **Status**: Estado de la cuenta (open, closed, frozen)
- **Transactions**: Lista de transacciones realizadas

### Invariantes Aplicadas
- **Límite de sobregiro máximo de £500**: La cuenta no puede tener un saldo menor a -£500
- **No créditos o débitos si la cuenta está congelada**: Las operaciones están bloqueadas en cuentas congeladas

### Políticas Correctivas
- **Rebotar transacción a cuenta fraudulenta**: Implementado a través del sistema de congelación de cuentas

### Eventos de Dominio
- `NaiveBankAccountOpened`: Cuando se abre una nueva cuenta
- `NaiveBankAccountClosed`: Cuando se cierra una cuenta
- `NaiveBankAccountFrozen`: Cuando se congela una cuenta
- `NaiveBankAccountUnfrozen`: Cuando se descongela una cuenta
- `NaiveBankAccountCredited`: Cuando se acredita dinero a la cuenta

## 🏗️ Arquitectura

El proyecto sigue la arquitectura hexagonal con DDD:

```
src/contexts/banking/naive-bank-accounts/
├── domain/                     # Capa de dominio
│   ├── NaiveBankAccount.ts    # Agregado principal
│   ├── NaiveBankAccountId.ts  # Value Object
│   ├── Balance.ts             # Value Object
│   ├── Currency.ts            # Value Object
│   ├── Transaction.ts         # Value Object
│   ├── Transactions.ts        # Collection
│   ├── NaiveBankAccountStatus.ts # Enum
│   ├── NaiveBankAccountRepository.ts # Interfaz del repositorio
│   ├── *Error.ts             # Errores de dominio
│   └── *Event.ts             # Eventos de dominio
├── application/               # Casos de uso
│   ├── open-naive-bank-account/
│   ├── close-naive-bank-account/
│   ├── freeze-naive-bank-account/
│   ├── unfreeze-naive-bank-account/
│   ├── credit-naive-bank-account/
│   ├── search-naive-bank-account/
│   └── search-naive-bank-account-by-balance/
└── infrastructure/            # Implementaciones
    └── PostgresNaiveBankAccountRepository.ts
```

## 🧪 Testing

El proyecto incluye tests completos siguiendo TDD:

- **Tests de Casos de Uso**: Verifican la lógica de negocio
- **Tests de Repositorio**: Verifican la persistencia
- **Object Mothers**: Para generar datos de test consistentes

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos del módulo
npm test -- tests/contexts/banking/naive-bank-accounts/
```

## 🚀 Casos de Uso Implementados

### Mutaciones (Commands)
1. **NaiveBankAccountOpener**: Abrir una nueva cuenta bancaria
2. **NaiveBankAccountCloser**: Cerrar una cuenta existente
3. **NaiveBankAccountFreezer**: Congelar una cuenta por actividad sospechosa
4. **NaiveBankAccountUnfreezer**: Descongelar una cuenta
5. **NaiveBankAccountCreditor**: Acreditar dinero a una cuenta

### Consultas (Queries)
1. **NaiveBankAccountSearcher**: Buscar cuenta por ID
2. **NaiveBankAccountBalanceSearcher**: Buscar cuentas por balance

## 💾 Persistencia

Implementación con PostgreSQL:
- Tabla `naive_bank_accounts` para almacenar el estado del agregado
- Serialización JSON para las transacciones
- Soporte para operaciones UPSERT

## 🛠️ Tecnologías

- **TypeScript**: Lenguaje principal
- **Jest**: Framework de testing
- **PostgreSQL**: Base de datos (interfaz)
- **Faker.js**: Generación de datos de test
- **UUID**: Generación de identificadores únicos

## 📦 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Compilar TypeScript
npm run build
```

## 🎯 Principios DDD Aplicados

1. **Agregados**: NaiveBankAccount como raíz de agregado
2. **Value Objects**: ID, Balance, Currency, etc.
3. **Domain Events**: Para comunicar cambios de estado
4. **Repository Pattern**: Abstracción de persistencia
5. **Domain Services**: Lógica que no pertenece a ninguna entidad
6. **Application Services**: Orquestación de casos de uso

## ✅ Validaciones y Reglas de Negocio

- Validación de UUID en NaiveBankAccountId
- Validación de monedas soportadas
- Aplicación de límites de sobregiro
- Prevención de operaciones en cuentas congeladas/cerradas
- Emisión automática de eventos de dominio

Este proyecto demuestra una implementación completa de DDD siguiendo las mejores prácticas de diseño de software y arquitectura limpia.
