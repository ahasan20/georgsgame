from qiskit.circuit.library import HGate, XGate, YGate, ZGate, CXGate, CYGate, CZGate, CHGate, SwapGate
from qiskit import QuantumCircuit, Aer, execute, QuantumRegister, ClassicalRegister
import numpy as np

GATE_DICT = {
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

def _state_to_gates(state):

    gates = []
    for qtop_gate, qbot_gate in zip(state[0], state[1]):
        if qtop_gate in ['H', 'X', 'Y', 'Z']:
            gates.append([qtop_gate, [0]])
            gates.append([qbot_gate, [1]])
        elif qtop_gate[0] == 'C':
            gates.append([qtop_gate[:2], [0, 1] if qtop_gate[-1] == '0' else [1, 0] ])

    return gates

def state_to_circuit(state):
    qr = QuantumRegister(2)
    cr = ClassicalRegister(2)
    qc = QuantumCircuit(qr, cr)

    gates = _state_to_gates(state)
    for gate in gates:
        qc.append(GATE_DICT[gate[0]], qargs=gate[1])
    return qc

def get_statevector(qc):
    return list(execute(qc, Aer.get_backend('statevector_simulator')).result().get_statevector())

def get_probabilities(qc):
    return np.square([ np.absolute(c) for c in get_statevector(qc)])

def get_measurement(qc):
    qc.measure([0, 1], [0, 1])
    result = execute(qc, Aer.get_backend('qasm_simulator'), shots=1)
    counts = result.result().get_counts(qc)
    return next(iter(counts.keys()))