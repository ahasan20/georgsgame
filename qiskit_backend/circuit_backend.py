from qiskit.circuit.library import HGate, XGate, YGate, ZGate, CXGate, CYGate, CZGate, CHGate
from qiskit.circuit.library import SwapGate, IGate, SGate, TGate, TdgGate, SdgGate, RYGate
from qiskit import QuantumCircuit, Aer, execute, QuantumRegister, ClassicalRegister
import numpy as np

SINGLE_GATE_DICT = {
    'I' : IGate(),
    'H' : HGate(),
    'X' : XGate(),
    'Y' : YGate(),
    'Z' : ZGate(),
    'S' : SGate(),
    'T' : TGate(),
    'T_dg' : TdgGate(),
    'S_dg' : SdgGate(),
    'RY' : RYGate(np.pi / 4)
}

CONTROLLED_GATE_DICT = {
    'CX0' : CXGate(),
    'CX1' : CXGate(),
    'CY0' : CYGate(),
    'CY1' : CYGate(),
    'CZ0' : CZGate(),
    'CZ1' : CYGate(),
    'CH0' : CHGate(),
    'CH1' : CHGate()
}

def _state_to_gates(state):

    gates = []
    for qtop_gate, qbot_gate in zip(state[0], state[1]):
        if qtop_gate in SINGLE_GATE_DICT.keys():
            gates.append([qtop_gate, [0]])
            gates.append([qbot_gate, [1]])
        elif qtop_gate in CONTROLLED_GATE_DICT.keys():
            gates.append([qtop_gate, [0, 1] if qtop_gate[-1] == '0' else [1, 0] ])

    return gates

def state_to_circuit(state):
    qr = QuantumRegister(2)
    cr = ClassicalRegister(2)
    qc = QuantumCircuit(qr, cr)

    gates = _state_to_gates(state)
    for gate in gates:
        if gate[0] in SINGLE_GATE_DICT.keys():
            qc.append(SINGLE_GATE_DICT[gate[0]], qargs=gate[1])
        elif gate[0] in CONTROLLED_GATE_DICT.keys():
            qc.append(CONTROLLED_GATE_DICT[gate[0]], qargs=gate[1])
    return qc

def _get_statevector_np_array(qc):
    return execute(qc, Aer.get_backend('statevector_simulator')).result().get_statevector()

def get_statevector(qc):
    return list(_get_statevector_np_array)

def get_probabilities(qc):
    probabilities = np.square([ np.absolute(c) for c in _get_statevector_np_array(qc)])
    return [ "{:.2%}".format(p) for p in probabilities ]

def get_measurement(qc):
    qc.measure([0, 1], [0, 1])
    result = execute(qc, Aer.get_backend('qasm_simulator'), shots=1)
    counts = result.result().get_counts(qc)
    return next(iter(counts.keys()))

qc = QuantumCircuit(2)
print(type(get_probabilities(qc)[0]))