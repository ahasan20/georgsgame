import json

from flask import render_template, request

import qiskit

from qiskit import QuantumCircuit, Aer, execute, QuantumRegister, ClassicalRegister
from qiskit.circuit.library import HGate, XGate, YGate, ZGate, CXGate, CYGate, CZGate, CHGate, SwapGate
import numpy as np

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
    print(state)


@app.route('/')
def index():
    return render_template('index.html')



gate_dict = {
    'H' : HGate(),
    'X' : XGate(),
    'Y' : YGate(),
    'Z' : ZGate(),
    'CX' : CXGate(),
    'CY' : CYGate(),
    'CZ' : CZGate(),
    'CH' : CHGate(),
    'SW' : SwapGate()
}

def list_to_circuit(gates):
    qr = QuantumRegister(2)
    cr = ClassicalRegister(2)
    qc = QuantumCircuit(qr, cr)
    for gate in gates:
        qc.append(gate_dict[gate[0]], qargs=gate[1])
    return qc

def get_statevector(qc):
    backend = Aer.get_backend('statevector_simulator')
    return execute(qc, backend).result().get_statevector()

def get_probabilities(qc):
    statevector = get_statevector(qc)
    p = []
    for c in statevector:
        p.append(np.absolute(c))
    return np.square(p)

def measure(qc):
    qc.measure([0, 1], [0, 1])
    backend = Aer.get_backend('qasm_simulator')
    result = execute(qc, backend, shots=1)
    counts = result.result().get_counts(qc)
    for k in counts.keys():
        return k
