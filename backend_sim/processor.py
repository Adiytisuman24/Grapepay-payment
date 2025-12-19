import time
import random

def simulate_llm_risk_analysis(tx_data):
    """Simulates an LLM-based risk analysis of a transaction."""
    models = ["GPT-4o", "DeepSeek-V3", "Claude-3.5-Sonnet"]
    model = random.choice(models)
    print(f"[PY PROCESSOR] Running LLM Risk Analysis using {model}...")
    time.sleep(0.5) # Simulate inference time
    risk_score = random.uniform(0, 1)
    return risk_score, model

if __name__ == "__main__":
    print("Starting GrapePay Python ML Processor...")
    while True:
        score, model = simulate_llm_risk_analysis({"id": random.randint(1000, 9999)})
        if score < 0.1:
            status = "APPROVED (SECURE)"
        elif score < 0.3:
            status = "FLAGGED (MANUAL REVIEW)"
        else:
            status = "DENIED (HIGH RISK)"
            
        print(f"[PY PROCESSOR] Analysis Complete: {status} | Score: {score:.2f} | via {model}")
        time.sleep(2)
