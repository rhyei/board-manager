## Installation

### Prerequisites

1. [Docker](https://docs.docker.com/engine/install/)
2. [Git](https://git-scm.com/downloads)

### Steps

### 1. Clone the Repository

```bash
git clone https://github.com/rhyei/board-manager.git
```

### 2. Configure

- Create and set up the `boards/defects/defect types` options in the `backend/data` folder.

  - Files: `defects.txt`, `defect_types.txt`, `products.txt`
  - Format:
    ```
    item1
    item2
    item3
    ```

- Create and configure `.env` files in the `./`, `./frontend`, and `./backend` directories.

### 3. Build the Project

```bash
docker-compose build
```

### 4. Run the Project

```bash
docker-compose up
```

- Access the application at [http://localhost:3000](http://localhost:3000) or `http://YOUR_IP_ADDRESS:PORT`.

## Updating

### 1. Pull from repository

```bash
git pull
```

### 2. Build

```bash
docker-compose build
```

### Or update using `update.bat` (Windows only) file in the root directory

- This script automates the update process.
