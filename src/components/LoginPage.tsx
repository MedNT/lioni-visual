'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LockIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: { username: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Login values:', values);

    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center justify-center space-y-1">
          <Image
            className={"mb-3"}
            src={'/Leoni_logo.png'}
            alt="lioni-logo"
            width={100}
            height={100}
          />
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      className={`pl-10 ${errors.username && touched.username ? 'border-destructive' : ''}`}
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-sm text-destructive"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <LockIcon className="h-4 w-4" />
                    </div>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`pl-10 ${errors.password && touched.password ? 'border-destructive' : ''}`}
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-destructive"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex justify-center">
          
        </CardFooter>
      </Card>
    </div>
  );
}
