import json

from flask import render_template, request

import qiskit
from qiskit import QuantumCircuit, Aer, execute

from app import app

@app.route("/api/version")
def version():
    return json.dumps(qiskit.__qiskit_version__, indent=4, sort_keys=True, default=str)

@app.route("/api/get/probabilities")
def get_probabilities():
    state = request.args.get('state')
    # translate state --> circuit
    return 
    
@app.route("/api/get/measurement")
def get_measurement():
    state = request.args.get('state')

@app.route('/')
def index():
    return render_template('index.html')