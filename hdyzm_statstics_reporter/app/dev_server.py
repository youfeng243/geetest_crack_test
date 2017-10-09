# -*- coding: utf-8 -*-

if __name__ == '__main__':
    import config
    from app import create_app
    application = create_app(config)
    
    application.run(
        host = '0.0.0.0',
        port = 23456,
        debug = True
    )