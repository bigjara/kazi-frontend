import React from 'react'

const VerifyAccountModal = () => {
  return (
    <div>
      
    </div>
  )
}

export default VerifyAccountModal

// /**
//  * FILE PATH: components/dashboard/modals/VerifyAccountModal.tsx
//  * 
//  * Modal showing KYC verification steps and progress
//  * Central hub for all verification steps
//  */

// 'use client';

// import React from 'react';
// import { X, User, FileText, Briefcase, CheckCircle2, ChevronLeft } from 'lucide-react';
// import { useDashboardState } from '@/hooks/useDashboardState';

// interface KYCStep {
//   id: keyof typeof kycProgress;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   modal: 'complete-profile' | 'identity-documents' | 'business-documents';
// }

// export default function VerifyAccountModal(): JSX.Element {
//   const { kycProgress, setCurrentModal, goBack } = useDashboardState();

//   // Define KYC steps
//   const kycSteps: KYCStep[] = [
//     {
//       id: 'completeProfile',
//       title: 'Complete Profile',
//       description: 'Fill in your details',
//       icon: <User className="w-5 h-5" />,
//       modal: 'complete-profile',
//     },
//     {
//       id: 'identityDocuments',
//       title: 'Identity Documents',
//       description: 'Government-issued ID',
//       icon: <FileText className="w-5 h-5" />,
//       modal: 'identity-documents',
//     },
//     {
//       id: 'businessDocuments',
//       title: 'Business Documents',
//       description: 'Business registration',
//       icon: <Briefcase className="w-5 h-5" />,
//       modal: 'business-documents',
//     },
//   ];

//   // Calculate progress percentage
//   const completedSteps = Object.values(kycProgress).filter(Boolean).length;
//   const progressPercentage = Math.round((completedSteps / 3) * 100);

//   /**
//    * Handle step click
//    * Opens the corresponding modal
//    */
//   const handleStepClick = (step: KYCStep): void => {
//     // Only allow clicking if not completed (or allow re-editing)
//     setCurrentModal(step.modal);
//   };

//   /**
//    * Handle back button
//    */
//   const handleBack = (): void => {
//     goBack();
//   };

//   /**
//    * Handle close
//    */
//   const handleClose = (): void => {
//     // If all steps complete, close and show active dashboard
//     if (progressPercentage === 100) {
//       setCurrentModal('active');
//     }
//     // Otherwise, don't allow closing
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
//       <div className="bg-white rounded-lg shadow-xl max-w-lg w-full relative">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-200 relative">
//           <button
//             onClick={handleBack}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4" />
//             <span>Back</span>
//           </button>
          
//           {progressPercentage === 100 && (
//             <button
//               onClick={handleClose}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               aria-label="Close modal"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           )}

//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-2">Verify Your Account</h2>
//             <p className="text-sm text-gray-600">
//               Complete the following steps to unlock your dashboard
//             </p>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="px-6 pt-6 pb-4">
//           <div className="flex items-center justify-between mb-2 text-sm">
//             <span className="font-medium">KYC Progress</span>
//             <span className="text-gray-600">{progressPercentage}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div
//               className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
//               style={{ width: `${progressPercentage}%` }}
//             />
//           </div>
//           <p className="text-xs text-gray-500 mt-2">
//             {completedSteps} of 3 steps completed
//           </p>
//         </div>

//         {/* KYC Steps */}
//         <div className="p-6 space-y-3">
//           {kycSteps.map((step) => {
//             const isCompleted = kycProgress[step.id];
            
//             return (
//               <button
//                 key={step.id}
//                 onClick={() => handleStepClick(step)}
//                 disabled={isCompleted}
//                 className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
//                   isCompleted
//                     ? 'bg-gray-800 border-gray-800 text-white cursor-default'
//                     : 'bg-white border-gray-200 hover:border-gray-800 hover:shadow-md'
//                 }`}
//               >
//                 <div className="flex items-center gap-4">
//                   <div
//                     className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                       isCompleted
//                         ? 'bg-white bg-opacity-20 text-white'
//                         : 'bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     {isCompleted ? (
//                       <CheckCircle2 className="w-5 h-5" />
//                     ) : (
//                       step.icon
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold mb-1">{step.title}</h3>
//                     <p
//                       className={`text-sm ${
//                         isCompleted 
//                           ? 'text-white text-opacity-80' 
//                           : 'text-gray-600'
//                       }`}
//                     >
//                       {isCompleted ? 'Completed ✓' : step.description}
//                     </p>
//                   </div>
//                   {!isCompleted && (
//                     <svg
//                       className="w-5 h-5 text-gray-400 flex-shrink-0"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   )}
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {/* Success Message when all complete */}
//         {progressPercentage === 100 && (
//           <div className="px-6 pb-6">
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
//               <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-green-900 mb-1">
//                   Verification Complete!
//                 </p>
//                 <p className="text-sm text-green-700">
//                   Your account has been successfully verified. You now have full access to the dashboard.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /**
//  * USAGE:
//  * This modal is automatically shown when currentModal === 'verify'
//  * 
//  * User can click on any step to open that step's modal:
//  * - Complete Profile → complete-profile
//  * - Identity Documents → identity-documents
//  * - Business Documents → business-documents
//  * 
//  * After completing each step, user returns here and sees updated progress
//  */