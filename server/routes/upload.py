import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from middleware.validate_file import require_musicxml_file

upload_bp = Blueprint('upload', __name__)


@upload_bp.post('/upload') # Will this cause an error? I notice that the main page doesn't have the url /upload
@require_musicxml_file
def upload():
    file = request.files['file']
    filename = f"{uuid.uuid4()}_{secure_filename(file.filename)}"
    save_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(save_path)
    return jsonify({
        'message': 'File received',
        'file_id': filename,
        'size': os.path.getsize(save_path),
    })
