import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper } from "lucide-react"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Новости</h1>
          </div>
          
          <Card className="shadow-lg border-border">
            <CardHeader className="text-center py-12">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                <Newspaper className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Скоро здесь появятся новости
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-2">
                Раздел новостей скоро будет доступен.
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-12">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Мы работаем над тем, чтобы предоставить вам самую актуальную информацию.
                  Следите за обновлениями!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}