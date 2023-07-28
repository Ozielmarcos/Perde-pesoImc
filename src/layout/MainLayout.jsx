import { Suspense, lazy } from 'react';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';

const PrivateRoute = lazy(() => import('../components/PrivateRoute'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SubscriptionPage = lazy(() => import('../pages/SubscriptionPage'));
const CreateStudentPage = lazy(() => import('../pages/CreateStudentPage'));
const ListStudents = lazy(() => import('../pages/ListStudents'));
const AppLayout = lazy(() => import('./AppLayout'));

function MainLayout() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route
          path="/students"
          element={(
            <PrivateRoute>
              <AppLayout>
                <ListStudents />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route
          path="/students/new"
          element={(
            <PrivateRoute>
              <AppLayout>
                <CreateStudentPage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route
          path="/students/:studentId"
          element={(
            <PrivateRoute>
              <AppLayout>
                <CreateStudentPage />
              </AppLayout>
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
      </Routes>
    </Suspense>
  );
}

export default MainLayout;
