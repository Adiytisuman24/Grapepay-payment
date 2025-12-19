package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

type Product struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	Price       float64   `json:"price"`
	Currency    string    `json:"currency"`
	Created     time.Time `json:"created"`
}

var products = []Product{
	{ID: "go_prod_1", Name: "Enterprise Solution", Description: "Go-powered high performance plan", Status: "active", Price: 499.00, Currency: "USD", Created: time.Now()},
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func validateProduct(w http.ResponseWriter, r *http.Request) {
	var p Product
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Printf("[GO CORE] Validating product: %s\n", p.Name)

	// Complex business logic simulation
	isValid := len(p.Name) > 3 && p.Price > 0

	response := map[string]interface{}{
		"valid":     isValid,
		"timestamp": time.Now(),
		"engine":    "Golang High-Performance Engine",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/go/products", getProducts)
	http.HandleFunc("/api/go/validate", validateProduct)

	port := ":4000"
	fmt.Printf("GrapePay Go Core Engine running on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
