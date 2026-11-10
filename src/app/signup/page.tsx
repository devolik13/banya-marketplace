import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-border/50 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Регистрация
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Создайте новый аккаунт для доступа к системе
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}