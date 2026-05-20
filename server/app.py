import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_FILE_SIZE_MB', 5)) * 1024 * 1024
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')

    CORS(app, origins=['http://localhost:5173'])

    from routes.health import health_bp
    from routes.upload import upload_bp
    from routes.convert import convert_bp
    from routes.download import download_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(upload_bp)
    app.register_blueprint(convert_bp)
    app.register_blueprint(download_bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(port=int(os.getenv('PORT', 5000)), debug=True)
