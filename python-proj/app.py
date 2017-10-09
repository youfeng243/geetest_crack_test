from flask import Flask

def create_app():
    app = Flask(__name__)

    from geetest_crack import geetest_crack_bp
    app.register_blueprint(geetest_crack_bp, url_prefix = '/geetest_crack')
    
    return app

application = create_app()

if __name__ == '__main__':
    application.run(
        host = '0.0.0.0',
        port = 7862
    )
