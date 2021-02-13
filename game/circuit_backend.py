from qiskit import QuantumCircuit, Aer, execute, QuantumRegister, ClassicalRegister
from qiskit.circuit.library import HGate, XGate, YGate, ZGate, CXGate, CYGate, CZGate, CHGate, SwapGate
import numpy as np

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
    return p