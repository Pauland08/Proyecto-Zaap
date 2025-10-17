from config import app, db
from routes.users import users_bp

# Registrar las rutas (Blueprint)
app.register_blueprint(users_bp, url_prefix="/api")

# Crear las tablas en la base de datos (solo la primera vez)
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=8000)