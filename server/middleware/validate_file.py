import os
from functools import wraps
from flask import request, jsonify

ALLOWED_EXTENSIONS = {'.xml', '.mxl'}
ALLOWED_MIMETYPES = {
    'application/xml',
    'text/xml',
    'application/vnd.recordare.musicxml+xml',
    'application/octet-stream',  # .mxl is a ZIP; browsers often send this
}


def require_musicxml_file(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'file' not in request.files:
            return jsonify({'error': 'No file field in request'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in ALLOWED_EXTENSIONS:
            return jsonify({'error': f'Unsupported file type: {ext}. Must be .xml or .mxl'}), 415
        return f(*args, **kwargs)
    return decorated
