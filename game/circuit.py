from qiskit import QuantumCircuit, Aer, execute, QuantumRegister, ClassicalRegister
# from qiskit.circuit.library import XGate, HGate, CXGate

class Game_circuit:
    def __init__(self):
        self.qr = QuantumRegister(2)
        self.cr = ClassicalRegister(2)
        self.circuit = QuantumCircuit(self.qr, self.cr)
        self.circuit.h(self.qr[0])
        self.circuit.h(self.qr[1])

    def measure(self):
        self.circuit.measure(self.qr, self.cr)
        backend = Aer.get_backend('qasm_simulator')
        result = execute(self.circuit, backend, shots=1)
        counts = result.result().get_counts(self.circuit)
        for k in counts.keys():
            return k

    def add_single_channel_gate(self, gate, channel):
        self.circuit.append(gate, qargs=[channel])
    
    def add_controlled_gate(self, gate, control, target):
        self.circuit.append(gate, qargs=[control, target])
    
    def add_swap_gate(self):
        self.circuit.swap(0, 1)
    
    # WIP
    def undo_gate(self, channel):
        data = self.get_data()
        if (len(data) == 2): return
        i = len(data) - 1
        while i > 2:
            print(i)
            instruction = data[i]
            if instruction == data[channel]: return
            qubits = instruction[1]
            print(qubits)
            if len(qubits) == 2:
                print('test0')
                data.pop(i)
                return
            ch = qubits[0].index
            if ch == channel:
                print('test1')
                data.pop(i)
                return
            i -= 1
    
    def get_data(self):
        return self.circuit.data