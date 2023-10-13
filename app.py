from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def runApp():
    return render_template('index.html')
@app.route('/guess/')
def guess():
    return render_template('guess.html')
    
@app.route('/tic-tac/')
def tic_tac():
    return render_template('tic-tac.html')
    
@app.route('/games/')
def games():
    return render_template('games.html')

