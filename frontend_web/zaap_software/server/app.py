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

@app.errorhandler(404)
def bad_request(e):
    return {"error": "Recurso no encontrado"}, 404

@app.errorhandler(401)
def unauthorized(e):
    return {"error": "No autorizado"}, 401

@app.errorhandler(403)
def forbidden(e):
    return {"error": "Prohibido"}, 403

@app.errorhandler(404)
def not_found(e):
    return {"error": "No encontrado"}, 404

@app.errorhandler(500)
def internal_server_error(e):
    return {"error": "Error interno del servidor"}, 500