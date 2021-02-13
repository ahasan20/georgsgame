import json

from flask import request

import qiskit
from qiskit import QuantumCircuit, Aer, execute
from qiskit_backend.circuit_backend import state_to_circuit, get_probabilities, get_statevector, get_measurement

from app import app

@app.route("/api/version")
def version():
    return json.dumps(qiskit.__qiskit_version__, indent=4, sort_keys=True, default=str)

@app.route("/api/get/probabilities", methods=['GET', 'POST'])
def get_probabilities_api():
    print(request.json)
    return json.dumps(get_probabilities(state_to_circuit(request.json['data']['state'])), indent=4, sort_keys=True, default=str)

@app.route("/api/get/measurement", methods=['GET', 'POST'])
def get_measurement_api():
    return json.dumps(get_measurement(state_to_circuit(request.json['data']['state'])), indent=4, sort_keys=True, default=str)

@app.route("/api/get/statevector", methods=['GET', 'POST'])
def get_statevector_api():
    return json.dumps(get_statevector(state_to_circuit(request.json['data']['state'])), indent=4, sort_keys=True, default=str)