"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Database, Sparkles, ArrowRight } from "lucide-react"

export default function QueryPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    try {
        // Send query to backend
        const res = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        })

        const data = await res.json()

        // Store backend response in sessionStorage for ResultsPage
        sessionStorage.setItem("queryResponse", JSON.stringify(data))

        // Navigate to results page
        navigate("/results")
    } catch (error) {
        console.error("Error processing query:", error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full gradient-primary">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Neo4j Query Interface
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your natural language into powerful Cypher queries using AI
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Describe what you want to find in your Neo4j database using plain English</p>
  
        </div>

        {/* Main Query Card */}
        <Card className="gradient-card border-2 border-transparent bg-clip-padding backdrop-blur-sm">
          <div className="absolute inset-0 gradient-border rounded-lg opacity-20 -z-10"></div>
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-serif flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Ask Your Question
            </CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter your query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full min-h-[150px] text-lg resize-none rounded-2xl p-4 shadow-md 
                     bg-white border border-border/40 focus:border-primary/60 
                     focus:ring-2 focus:ring-primary/30 transition-all duration-300 query-container"
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-pink-300 to-red-300 hover:opacity-90 
                     transition-all duration-300 text-lg px-8 py-3 rounded-full 
                     shadow-lg hover:shadow-xl transform hover:scale-105 text-black button"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Generate Cypher Query
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: Database,
              title: "Neo4j Integration",
              description: "Direct connection to your Neo4j database for real-time queries",
            },
            {
              icon: Sparkles,
              title: "AI-Powered",
              description: "Uses Gemini API to convert natural language to Cypher",
            },
            {
              icon: ArrowRight,
              title: "Instant Results",
              description: "Get beautifully formatted results in seconds",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="gradient-card border border-border/30 hover:border-primary/30 transition-all duration-300 card"
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-serif font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
