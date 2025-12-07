# app.py
from config import app, db
from routes.users import users_bp
from routes.adoptions import adoptions_bp
from routes.animals import animals_bp
from routes.donations import donations_bp
from routes.volunteers import volunteers_bp


# blueprints
app.register_blueprint(users_bp)
app.register_blueprint(adoptions_bp)
app.register_blueprint(animals_bp)
app.register_blueprint(donations_bp)
app.register_blueprint(volunteers_bp)


# Healthcheck
@app.route('/')
def home():
    return {"status": "ok", "message": "Servidor Flask conectado a MySQL correctamente"}, 200

# Manejo de errores
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
    with app.app_context():
        try:
            db.engine.connect()
            print("Conexión a MySQL exitosa.")
        except Exception as err:
            print("Error conectando a MySQL:", err)
    app.run(debug=True, port=8000)

@app.before_request
def ensure_json():
    if request.method in ('POST', 'PUT', 'PATCH'):
        if not request.is_json:
            return {"error": "Content-Type debe ser application/json"}, 415
