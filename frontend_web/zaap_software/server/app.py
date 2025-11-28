from config import app, db
from routes.users import users_bp

# Registrar blueprints (agrega más cuando existan)
app.register_blueprint(users_bp)

# Healthcheck simple
@app.route('/')
def home():
    return {"status": "ok", "message": "Servidor Flask conectado a MySQL correctamente"}, 200

# Manejo de errores uniforme
@app.errorhandler(400)
def bad_request(e):
    return {"error": "Bad Request", "message": str(e)}, 400

@app.errorhandler(401)
def unauthorized(e):
    return {"error": "No autorizado"}, 401

@app.errorhandler(403)
def forbidden(e):
    return {"error": "Prohibido"}, 403

@app.errorhandler(404)
def not_found(e):
    return {"error": "Recurso no encontrado"}, 404

@app.errorhandler(500)
def internal_server_error(e):
    return {"error": "Error interno del servidor"}, 500

if __name__ == "__main__":
    # Comprobamos que la BD responde antes de levantar el servidor
    with app.app_context():
        try:
            db.engine.connect()
            print("Conexión a MySQL exitosa.")
        except Exception as err:
            print("Error conectando a MySQL:", err)
    app.run(debug=True, port=8000)
