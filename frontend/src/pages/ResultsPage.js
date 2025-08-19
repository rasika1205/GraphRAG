"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, Copy, Database, CheckCircle, Clock, Users } from "lucide-react"
import { useToast } from "../hooks/use-toast"

export default function ResultsPage() {
  const [naturalQuery, setNaturalQuery] = useState("")
  const { toast } = useToast()

  // Helper to copy text to clipboard and show toast
  function copyToClipboard(text) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast({
            title: "Copied!",
            description: "Cypher query copied to clipboard.",
            status: "success",
            duration: 2000,
          })
        })
        .catch(() => {
          toast({
            title: "Copy failed",
            description: "Could not copy to clipboard.",
            status: "error",
            duration: 2000,
          })
        })
    }
  }
  const [cypherQuery, setCypherQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [executionTime, setExecutionTime] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
  const stored = sessionStorage.getItem("queryResponse")
  if (!stored) {
    navigate("/")
    return
  }

  const data = JSON.parse(stored)

  setNaturalQuery(data.naturalQuery)
  setCypherQuery(data.cypherQuery)
  setResults(data.results || [])
  setExecutionTime(data.executionTime || 0)
  setIsLoading(false)
}, [navigate])


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-serif">Processing your query...</h2>
          <p className="text-muted-foreground">Converting to Cypher and executing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 space-y-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="hover:bg-muted/20">
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Query
          </Button>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {executionTime}s
            </div>
            <div className="flex items-center gap-1">
              <Database className="w-4 h-4" />
              {results.length} results
            </div>
          </div>
        </div>

        {/* Original Query */}
        <Card className="gradient-card border border-border/30 mb-6">
          <CardHeader>
            <CardTitle className="font-serif">Your Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{naturalQuery}</p>
          </CardContent>
        </Card>

        {/* Generated Cypher Query */}
        <Card className="gradient-card border border-border/30 mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-serif">Generated Cypher Query</CardTitle>
              <CardDescription>AI-converted query ready for Neo4j</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(cypherQuery)}
              className="hover:bg-primary/10"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto text-sm border border-border/20">
              <code>{cypherQuery}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="gradient-card border border-border/30">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Query Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Found {results.length} matching records in your Neo4j database</p>
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card
                  key={index}
                  className="bg-muted/10 border border-border/20 hover:border-primary/30 transition-all duration-200"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">{result.p.name}</h3>
                        <Badge variant="secondary" className="bg-primary/20 text-primary">
                          {result.p.born}
                        </Badge>
                      </div>
                    </div>

                    
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
