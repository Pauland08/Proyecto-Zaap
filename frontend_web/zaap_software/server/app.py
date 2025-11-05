from config import app, db, jwt
from routes.users import users_bp

app.register_blueprint(users_bp)

@app.route('/')
def home():
    return "Servidor Flask conectado a MySQL correctamente"

if __name__ == "__main__":
    with app.app_context():
        db.engine.connect()
        print("Conexión a MySQL exitosa.")
    app.run(debug=True, port=8000)