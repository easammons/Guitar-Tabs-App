from flask import Blueprint, request, send_from_directory, current_app

download_bp = Blueprint('download', __name__)


@download_bp.get('/download')
def download():
    file_id = request.args.get('file_id')
    if not file_id:
        return {'error': 'file_id query param required'}, 400
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], file_id, as_attachment=True)
