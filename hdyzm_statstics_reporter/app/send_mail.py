# -*- coding: utf-8 -*-


if __name__ == '__main__':
    import utils
    import config
    import send_mail_config
    import datetime
    from app import create_app
    from email.mime.text import MIMEText

    application = create_app(config)
    tc = application.test_client()

    report_resp = tc.get('/report')

    utils.send_email(
        send_mail_config.from_addr, 
        send_mail_config.password, 
        send_mail_config.to_addrs, 
        '滑动验证码破解统计 - %s' % (datetime.datetime.now().date() - datetime.timedelta(days=1)).isoformat(), 
        MIMEText(report_resp.data, 'html', 'utf-8')
    )

