import json
import qiskit
from qiskit import QuantumCircuit, Aer, execute
from flask import render_template

from app import app

@app.route("/api/version")
def version():
    return json.dumps(qiskit.__qiskit_version__, indent=4, sort_keys=True, default=str)

@app.route("/api/test/simulator")
def test_simulator():
    gate = request.args.get('gate')
    qc = QuantumCircuit(1, 1)
    if gate == 'X': qc.x(0)
    qc.measure(0, 0)
    return json.dumps(execute(qc, Aer.get_backend('qasm_simulator')).result().get_counts(), indent=4, sort_keys=True, default=str)

@app.route('/')
def index():
    return render_template('index.html')