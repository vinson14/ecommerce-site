from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional


class SignupForm(FlaskForm):

    name = StringField(
        'Name',
        validators=[DataRequired()]
    )

    email = StringField(
        "Email",
        validators=[
            Length(min=6),
            Email(message="Enter a valid email."),
            DataRequired()
        ]
    )

    password = PasswordField(
        'Password',
        validators=[
            DataRequired(),
            Length(min=6, message='Please use a longer password'))
        ]
    )

    confirm_password = PasswordField(
        'Confirm your password',
        validators=[
            DataRequired(),
            EqualTo('password', message='Passwords do not match')
        ]
    )

    submit = SubmitField
