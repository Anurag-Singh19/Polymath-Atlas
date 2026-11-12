import { SkillNode } from '../types/curriculum';

export const SKILLS_AI_ML: SkillNode[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    aliases: ['Ai/Ml', 'Machine Learning', 'Statistical Learning'],
    domain: 'ai-ml',
    summary:
      'Supervised and unsupervised learning, feature engineering, bias-variance tradeoffs, gradient boosting, and rigorous model evaluation.',
    estimatedDays: 14,
    tier: 2,
    prerequisites: ['python-dsa', 'sql'],
    unlocks: ['neural-networks', 'deep-learning', 'mlops', 'quant'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'ai-ml-d1',
        dayRange: 'Day 1 – 3',
        title: 'Linear Models, Loss Functions & Optimization',
        objective: 'Master OLS, logistic regression, regularization, and gradient descent geometry.',
        topics: [
          {
            id: 'ai-ml-t1',
            title: 'Gradient Descent, Convexity & Regularization (L1/L2)',
            summary: 'Derive Ridge and Lasso penalties and analyze learning rate schedules.',
            resources: [
              { title: 'CS229 Lecture Notes: Supervised Learning', provider: 'Stanford CS229', url: 'https://cs229.stanford.edu/main_notes.pdf', kind: 'Guide' },
              { title: 'Scikit-Learn Linear Models User Guide', provider: 'scikit-learn', url: 'https://scikit-learn.org/stable/modules/linear_model.html', kind: 'Docs' },
            ],
          },
          {
            id: 'ai-ml-t2',
            title: 'Bias-Variance Decomposition & Cross-Validation',
            summary: 'Prevent leakage using stratified k-fold, time-series splits, and nested CV.',
            resources: [
              { title: 'Cross-Validation & Leakage Prevention', provider: 'scikit-learn', url: 'https://scikit-learn.org/stable/modules/cross_validation.html', kind: 'Docs' },
              { title: 'Intro to Statistical Learning (ISLP)', provider: 'Stanford / Springer', url: 'https://www.statlearning.com/', kind: 'Book' },
            ],
          },
        ],
      },
      {
        id: 'ai-ml-d2',
        dayRange: 'Day 4 – 7',
        title: 'Tree Ensembles & Tabular Dominance',
        objective: 'Build high-performing XGBoost, LightGBM, and CatBoost pipelines.',
        topics: [
          {
            id: 'ai-ml-t3',
            title: 'Decision Trees, Random Forests & Bagging',
            summary: 'Gini impurity, entropy splits, out-of-bag error, and variance reduction.',
            resources: [
              { title: 'Ensemble Methods Documentation', provider: 'scikit-learn', url: 'https://scikit-learn.org/stable/modules/ensemble.html', kind: 'Docs' },
              { title: 'Intermediate Machine Learning', provider: 'Kaggle Learn', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', kind: 'Course' },
            ],
          },
          {
            id: 'ai-ml-t4',
            title: 'Gradient Boosted Decision Trees (XGBoost / LightGBM)',
            summary: 'Second-order Taylor approximations, histogram binning, and early stopping.',
            resources: [
              { title: 'XGBoost Tutorials & Parameters', provider: 'XGBoost Docs', url: 'https://xgboost.readthedocs.io/en/stable/tutorials/index.html', kind: 'Docs' },
              { title: 'LightGBM Features & Leaf-Wise Growth', provider: 'Microsoft LightGBM', url: 'https://lightgbm.readthedocs.io/en/latest/Features.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ai-ml-d3',
        dayRange: 'Day 8 – 11',
        title: 'Unsupervised Learning, Dimensionality & Explainability',
        objective: 'Cluster high-dimensional embeddings and explain predictions with Shapley values.',
        topics: [
          {
            id: 'ai-ml-t5',
            title: 'PCA, UMAP, K-Means & HDBSCAN Clustering',
            summary: 'Eigen-decomposition vs manifold preservation for dense feature spaces.',
            resources: [
              { title: 'UMAP Theory & How It Works', provider: 'UMAP Docs', url: 'https://umap-learn.readthedocs.io/en/latest/how_umap_works.html', kind: 'Docs' },
            ],
          },
          {
            id: 'ai-ml-t6',
            title: 'Model Calibration & SHAP Feature Attribution',
            summary: 'Platt scaling, isotonic regression, and TreeSHAP local/global explanations.',
            resources: [
              { title: 'SHAP Explainable AI Documentation', provider: 'SHAP', url: 'https://shap.readthedocs.io/en/latest/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ai-ml-d4',
        dayRange: 'Day 12 – 14',
        title: 'Production Metrics, Drift & Benchmarking',
        objective: 'Align offline ROC-AUC / PR-AUC with online business cost matrices.',
        topics: [
          {
            id: 'ai-ml-t7',
            title: 'Imbalanced Classification, PR Curves & Cost-Sensitive Thresholding',
            summary: 'Optimize decision thresholds for asymmetric false-positive vs false-negative costs.',
            resources: [
              { title: 'Google ML Crash Course: Classification', provider: 'Google Developers', url: 'https://developers.google.com/machine-learning/crash-course/classification', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Random Forests',
        authors: 'Leo Breiman',
        year: 2001,
        venue: 'Machine Learning (Springer)',
        url: 'https://link.springer.com/article/10.1023/A:1010933404324',
        takeaway: 'Proves generalization error bounds using tree strength and inter-tree correlation.',
      },
      {
        title: 'XGBoost: A Scalable Tree Boosting System',
        authors: 'Tianqi Chen, Carlos Guestrin',
        year: 2016,
        venue: 'KDD / arXiv:1603.02754',
        url: 'https://arxiv.org/abs/1603.02754',
        takeaway: 'Introduces sparsity-aware split finding and weighted quantile sketch for scalable GBDTs.',
      },
      {
        title: 'A Unified Approach to Interpreting Model Predictions (SHAP)',
        authors: 'Scott M. Lundberg, Su-In Lee',
        year: 2017,
        venue: 'NeurIPS / arXiv:1705.07874',
        url: 'https://arxiv.org/abs/1705.07874',
        takeaway: 'Unifies LIME and Shapley game-theoretic values for consistent feature attribution.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Leakage-Free Tabular Churn & Credit Risk Pipeline',
          tier: 'Required',
          scope: 'End-to-end scikit-learn Pipeline with ColumnTransformer, Optuna tuning, calibration curves, and SHAP summary report.',
          stack: 'Python, scikit-learn, XGBoost, SHAP, Optuna',
          resumeBullet: 'Built calibrated XGBoost risk classifier improving PR-AUC by 14% using leakage-free time-series cross-validation and SHAP explanations.',
        },
        {
          title: 'Customer Segmentation & Anomaly Engine',
          tier: 'Required',
          scope: 'Compare K-Means, GMM, and HDBSCAN with UMAP projection and silhouette stability diagnostics.',
          stack: 'Python, UMAP, HDBSCAN, Pandas',
          resumeBullet: 'Engineered unsupervised behavioral clustering pipeline processing 250k records with automated outlier isolation.',
        },
      ],
      scalable: [
        {
          title: 'Real-Time Fraud Scoring API with Drift Telemetry',
          tier: 'Scalable Capstone',
          scope: 'Low-latency FastAPI inference service with LightGBM ONNX export, feature store caching, and PSI drift alerts.',
          stack: 'LightGBM, ONNX Runtime, FastAPI, Redis, Evidently',
          resumeBullet: 'Deployed ONNX-compiled LightGBM scoring API handling 1,200 req/s at <12ms p99 latency with automated covariate drift detection.',
        },
        {
          title: 'Multi-Horizon Demand Forecasting Workbench',
          tier: 'Scalable Capstone',
          scope: 'Hierarchical reconciliation across SKU/region levels combining LightGBM lag features with conformal prediction intervals.',
          stack: 'Python, LightGBM, Polars, MAPIE',
          resumeBullet: 'Designed conformalized demand forecasting engine reducing stockout error by 19% across 4,000 SKUs.',
        },
      ],
    },
    certifications: [
      { name: 'Machine Learning Specialization (Free Audit)', issuer: 'Stanford Online / DeepLearning.AI via Coursera', url: 'https://www.coursera.org/specializations/machine-learning-introduction', costNote: 'Free Audit', focus: 'Supervised, unsupervised, and recommender fundamentals' },
      { name: 'Intro & Intermediate Machine Learning Certificates', issuer: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', costNote: '100% Free Certificate', focus: 'Hands-on tabular ML, XGBoost, and leakage checks' },
      { name: 'Machine Learning Crash Course', issuer: 'Google Developers', url: 'https://developers.google.com/machine-learning/crash-course', costNote: '100% Free', focus: 'Production ML engineering and fairness' },
    ],
    flashcards: [
      { id: 'ai-ml-fc1', topicId: 'ai-ml-t1', topicTitle: 'Gradient Descent & Regularization', question: 'Why does L1 (Lasso) regularization produce sparse feature weights while L2 (Ridge) shrinks weights smoothly?', answer: 'The L1 diamond constraint ball has sharp corners on the coordinate axes where level sets of the quadratic loss frequently intersect, zeroing out coefficients; L2 uses a smooth hypersphere.', difficulty: 'Core' },
      { id: 'ai-ml-fc2', topicId: 'ai-ml-t1', topicTitle: 'Gradient Descent & Regularization', question: 'What happens if the learning rate exceeds 2/L for an L-smooth convex objective?', answer: 'Gradient descent steps overshoot the minimum and the loss diverges or oscillates unstably.', difficulty: 'Deep Dive' },
      { id: 'ai-ml-fc3', topicId: 'ai-ml-t2', topicTitle: 'Bias-Variance & Cross-Validation', question: 'How does target leakage occur during standard k-fold cross-validation?', answer: 'Fitting scalers, imputers, or target encoders on the entire dataset before splitting leaks validation fold statistics into training.', difficulty: 'Core' },
      { id: 'ai-ml-fc4', topicId: 'ai-ml-t3', topicTitle: 'Decision Trees & Random Forests', question: 'How does Random Forest reduce variance compared to a single decision tree?', answer: 'By bootstrap aggregating (bagging) deep trees and sampling a random subset of features at each split to decorrelate tree predictions.', difficulty: 'Core' },
      { id: 'ai-ml-fc5', topicId: 'ai-ml-t4', topicTitle: 'Gradient Boosted Trees', question: 'What second-order information does XGBoost use at each boosting step?', answer: 'Both the first-order gradient (g_i) and second-order Hessian (h_i) of the loss function to compute optimal leaf weights analytically.', difficulty: 'Applied' },
      { id: 'ai-ml-fc6', topicId: 'ai-ml-t5', topicTitle: 'PCA, UMAP & Clustering', question: 'Why prefer HDBSCAN over K-Means on non-convex clusters with noise?', answer: 'HDBSCAN discovers density-connected clusters of varying shapes without requiring k upfront and explicitly labels sparse outliers as noise.', difficulty: 'Applied' },
      { id: 'ai-ml-fc7', topicId: 'ai-ml-t6', topicTitle: 'Calibration & SHAP', question: 'Why is ROC-AUC unchanged by monotonic probability miscalibration, and when does that hurt?', answer: 'ROC-AUC only measures rank ordering; when downstream systems threshold probabilities or sum expected values, uncalibrated scores distort decisions.', difficulty: 'Deep Dive' },
      { id: 'ai-ml-fc8', topicId: 'ai-ml-t7', topicTitle: 'Imbalanced Classification', question: 'Why can high ROC-AUC be misleading on 0.1% positive-rate fraud datasets?', answer: 'True negatives dominate the false-positive rate denominator; Precision-Recall AUC directly reflects positive prediction quality.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    aliases: ['Neural Network', 'Perceptrons', 'Backpropagation'],
    domain: 'ai-ml',
    summary:
      'Computational graphs, automatic differentiation from scratch, activation dynamics, batch/layer normalization, and optimization math.',
    estimatedDays: 10,
    tier: 2,
    prerequisites: ['ai-ml', 'python-dsa'],
    unlocks: ['deep-learning', 'robotics'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'nn-d1',
        dayRange: 'Day 1 – 3',
        title: 'Autograd & Backpropagation from First Principles',
        objective: 'Build a scalar and tensor autograd engine by hand.',
        topics: [
          {
            id: 'nn-t1',
            title: 'Computational Graphs & Reverse-Mode Autodiff',
            summary: 'Chain rule through DAGs, topological sort, and Jacobian-vector products.',
            resources: [
              { title: 'Neural Networks: Zero to Hero (Micrograd)', provider: 'Andrej Karpathy', url: 'https://karpathy.ai/zero-to-hero.html', kind: 'Course' },
              { title: 'CS231n Backprop Notes', provider: 'Stanford CS231n', url: 'https://cs231n.github.io/optimization-2/', kind: 'Guide' },
            ],
          },
          {
            id: 'nn-t2',
            title: 'Loss Landscapes, Softmax & Cross-Entropy Stability',
            summary: 'Log-sum-exp trick, numerical stability, and negative log-likelihood gradients.',
            resources: [
              { title: 'PyTorch Autograd Mechanics', provider: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/notes/autograd.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'nn-d2',
        dayRange: 'Day 4 – 6',
        title: 'Initialization, Activations & Normalization',
        objective: 'Prevent vanishing and exploding activations across deep MLPs.',
        topics: [
          {
            id: 'nn-t3',
            title: 'Xavier/Glorot & Kaiming/He Initialization',
            summary: 'Preserve activation and gradient variance across linear + ReLU/GELU layers.',
            resources: [
              { title: '3Blue1Brown Neural Networks Series', provider: '3Blue1Brown', url: 'https://www.3blue1brown.com/topics/neural-networks', kind: 'Guide' },
            ],
          },
          {
            id: 'nn-t4',
            title: 'BatchNorm, LayerNorm, RMSNorm & Residual Connections',
            summary: 'Compare covariate shift smoothing, inference buffers, and gradient highways.',
            resources: [
              { title: 'PyTorch Normalization Layers', provider: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/nn.html#normalization-layers', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'nn-d3',
        dayRange: 'Day 7 – 8',
        title: 'Adaptive Optimizers & Regularization',
        objective: 'Understand Momentum, AdamW, weight decay decoupling, and dropout.',
        topics: [
          {
            id: 'nn-t5',
            title: 'SGD with Momentum, Adam & AdamW Decoupled Weight Decay',
            summary: 'First/second moment bias correction and why L2 != weight decay in Adam.',
            resources: [
              { title: 'An Overview of Gradient Descent Optimization', provider: 'Sebastian Ruder', url: 'https://www.ruder.io/optimizing-gradient-descent/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'nn-d4',
        dayRange: 'Day 9 – 10',
        title: 'Diagnostics & Empirical Scaling',
        objective: 'Debug dead ReLUs, gradient norms, and learning rate finders.',
        topics: [
          {
            id: 'nn-t6',
            title: 'Activation Histograms, Gradient Clipping & LR Warmup',
            summary: 'Instrument layer-by-layer SNR and gradient norms during training.',
            resources: [
              { title: 'A Recipe for Training Neural Networks', provider: 'Andrej Karpathy', url: 'http://karpathy.github.io/2019/04/25/recipe/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Learning Representations by Back-Propagating Errors',
        authors: 'David E. Rumelhart, Geoffrey E. Hinton, Ronald J. Williams',
        year: 1986,
        venue: 'Nature',
        url: 'https://www.nature.com/articles/323533a0',
        takeaway: 'Demonstrated how backpropagation discovers internal hidden representations.',
      },
      {
        title: 'Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet',
        authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun',
        year: 2015,
        venue: 'ICCV / arXiv:1502.01852',
        url: 'https://arxiv.org/abs/1502.01852',
        takeaway: 'Derives Kaiming initialization variance scaling (2/n_in) for ReLU networks.',
      },
      {
        title: 'Decoupled Weight Decay Regularization (AdamW)',
        authors: 'Ilya Loshchilov, Frank Hutter',
        year: 2019,
        venue: 'ICLR / arXiv:1711.05101',
        url: 'https://arxiv.org/abs/1711.05101',
        takeaway: 'Fixes Adam generalization by decoupling L2 penalty from adaptive moment scaling.',
      },
    ],
    projects: {
      required: [
        {
          title: 'TinyTensor: Pure-NumPy Autograd & MLP Engine',
          tier: 'Required',
          scope: 'Implement reverse-mode autodiff, Linear, ReLU, LayerNorm, CrossEntropy, and AdamW without PyTorch.',
          stack: 'Python, NumPy, Pytest',
          resumeBullet: 'Implemented a vectorized reverse-mode autograd library in pure NumPy achieving gradient parity with PyTorch within 1e-6.',
        },
        {
          title: 'Activation & Gradient Flow Diagnostic Suite',
          tier: 'Required',
          scope: 'Interactive visualization comparing Xavier vs Kaiming init and BatchNorm vs LayerNorm across 20-layer MLPs.',
          stack: 'PyTorch, Matplotlib, Weights & Biases',
          resumeBullet: 'Built layer-wise gradient norm and dead-neuron telemetry diagnosing training collapse in deep residual MLPs.',
        },
      ],
      scalable: [
        {
          title: 'Physics-Informed Neural Network (PINN) PDE Solver',
          tier: 'Scalable Capstone',
          scope: 'Train smooth SIREN/tanh neural networks enforcing Navier-Stokes or heat equation residuals via higher-order autograd.',
          stack: 'PyTorch, torch.func, SciPy',
          resumeBullet: 'Engineered Physics-Informed Neural Network solving 2D heat diffusion boundary problems 35x faster than finite-difference sweeps.',
        },
        {
          title: 'Grokking & Modular Arithmetic Phase-Transition Lab',
          tier: 'Scalable Capstone',
          scope: 'Reproduce delayed generalization ("grokking") under varying AdamW weight decay regimes.',
          stack: 'PyTorch, Einops, TensorBoard',
          resumeBullet: 'Analyzed representation phase transitions and weight-norm decay across 40+ modular arithmetic training sweeps.',
        },
      ],
    },
    certifications: [
      { name: 'Neural Networks and Deep Learning (Free Audit)', issuer: 'DeepLearning.AI via Coursera', url: 'https://www.coursera.org/learn/neural-networks-deep-learning', costNote: 'Free Audit', focus: 'Backprop math and vectorized network design' },
      { name: 'Intro to Deep Learning', issuer: 'Kaggle Learn', url: 'https://www.kaggle.com/learn/intro-to-deep-learning', costNote: '100% Free Certificate', focus: 'SGD, batch normalization, and dropout' },
      { name: 'MIT 6.S191 Introduction to Deep Learning', issuer: 'MIT OpenCourseWare', url: 'https://introtodeeplearning.com/', costNote: '100% Free Open Lectures & Labs', focus: 'Foundational neural architectures' },
    ],
    flashcards: [
      { id: 'nn-fc1', topicId: 'nn-t1', topicTitle: 'Autograd & Backprop', question: 'Why is reverse-mode autodiff preferred over forward-mode in neural network training?', answer: 'Networks map millions of parameters to 1 scalar loss; reverse-mode computes all parameter gradients in a single backward pass.', difficulty: 'Core' },
      { id: 'nn-fc2', topicId: 'nn-t2', topicTitle: 'Softmax & Log-Sum-Exp', question: 'How does subtracting max(z) before exp(z) stabilize Softmax?', answer: 'It prevents float32/float16 overflow on large logits while leaving the normalized probability distribution mathematically identical.', difficulty: 'Core' },
      { id: 'nn-fc3', topicId: 'nn-t3', topicTitle: 'Kaiming Initialization', question: 'Why does Kaiming init scale weight variance by 2/n_in instead of 1/n_in for ReLU?', answer: 'ReLU zeroes roughly half the pre-activations, halving output variance; multiplying by 2 preserves signal magnitude across layers.', difficulty: 'Applied' },
      { id: 'nn-fc4', topicId: 'nn-t4', topicTitle: 'Normalization Layers', question: 'Why do Transformers use LayerNorm/RMSNorm instead of BatchNorm?', answer: 'Sequence lengths vary and batch sizes can be small; LayerNorm normalizes across the feature dimension per token without batch statistics.', difficulty: 'Applied' },
      { id: 'nn-fc5', topicId: 'nn-t4', topicTitle: 'Residual Connections', question: 'How do skip connections (x + F(x)) solve deep network degradation?', answer: 'They create an unimpeded additive gradient highway back to early layers, letting layers learn incremental residuals around identity.', difficulty: 'Core' },
      { id: 'nn-fc6', topicId: 'nn-t5', topicTitle: 'AdamW Optimizer', question: 'Why did classic L2 regularization behave inconsistently inside standard Adam?', answer: 'Adam divides the L2 gradient by the running second moment v_t, weakening regularization on parameters with historically large gradients.', difficulty: 'Deep Dive' },
      { id: 'nn-fc7', topicId: 'nn-t6', topicTitle: 'Training Diagnostics', question: 'What does a flat loss plateau followed by sudden NaN typically indicate?', answer: 'Gradient explosion from missing LR warmup or insufficient gradient clipping.', difficulty: 'Applied' },
      { id: 'nn-fc8', topicId: 'nn-t1', topicTitle: 'Autograd Mechanics', question: 'Why must gradients be zeroed (optimizer.zero_grad()) before each backward pass in PyTorch?', answer: 'PyTorch accumulates gradients into .grad tensors by default to support gradient accumulation across microbatches.', difficulty: 'Core' },
    ],
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    aliases: ['Deep Ai Learning', 'CNNs', 'Transformers', 'PyTorch'],
    domain: 'ai-ml',
    summary:
      'Vision architectures, sequence modeling, self-attention mechanics, mixed-precision training, and distributed GPU scaling in PyTorch.',
    estimatedDays: 16,
    tier: 3,
    prerequisites: ['neural-networks', 'ai-ml'],
    unlocks: ['llm', 'gen-ai', 'mlops', 'robotics'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'dl-d1',
        dayRange: 'Day 1 – 4',
        title: 'Convolutional & Vision Architectures',
        objective: 'Master ResNets, ViTs, receptive fields, and modern vision backbones.',
        topics: [
          {
            id: 'dl-t1',
            title: 'ResNet, ConvNeXt & Vision Transformers (ViT)',
            summary: 'Patch embeddings, inductive bias vs global self-attention, and feature pyramids.',
            resources: [
              { title: 'Stanford CS231n Deep Learning for Computer Vision', provider: 'Stanford', url: 'https://cs231n.stanford.edu/', kind: 'Course' },
              { title: 'PyTorch Vision Models', provider: 'Torchvision', url: 'https://pytorch.org/vision/stable/models.html', kind: 'Docs' },
            ],
          },
          {
            id: 'dl-t2',
            title: 'Contrastive Vision-Language Pretraining (CLIP / SigLIP)',
            summary: 'InfoNCE loss and shared multimodal embedding spaces.',
            resources: [
              { title: 'OpenCLIP Documentation', provider: 'LAION / OpenCLIP', url: 'https://github.com/mlfoundations/open_clip', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'dl-d2',
        dayRange: 'Day 5 – 8',
        title: 'Attention & Transformer Mechanics',
        objective: 'Implement multi-head causal & cross-attention with rotary embeddings.',
        topics: [
          {
            id: 'dl-t3',
            title: 'Scaled Dot-Product Attention & RoPE Positional Encoding',
            summary: 'Query-key scaling by sqrt(d_k), causal masking, and relative rotation.',
            resources: [
              { title: 'The Illustrated Transformer', provider: 'Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', kind: 'Guide' },
            ],
          },
          {
            id: 'dl-t4',
            title: 'FlashAttention & Memory Hierarchy Optimization',
            summary: 'Tiling QKV blocks in GPU SRAM to eliminate O(N^2) HBM reads/writes.',
            resources: [
              { title: 'PyTorch Scaled Dot Product Attention (SDPA)', provider: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'dl-d3',
        dayRange: 'Day 9 – 12',
        title: 'Mixed Precision & Multi-GPU Distributed Training',
        objective: 'Train large models cleanly with bf16, torch.compile, DDP, and FSDP.',
        topics: [
          {
            id: 'dl-t5',
            title: 'BF16/FP16 AMP, Gradient Checkpointing & torch.compile',
            summary: 'Trade compute vs activation VRAM using activation checkpointing.',
            resources: [
              { title: 'PyTorch Automatic Mixed Precision Guide', provider: 'PyTorch Docs', url: 'https://pytorch.org/docs/stable/amp.html', kind: 'Docs' },
            ],
          },
          {
            id: 'dl-t6',
            title: 'DistributedDataParallel (DDP) & ZeRO / FSDP Sharding',
            summary: 'All-reduce gradient ring vs sharding optimizer states, gradients, and weights.',
            resources: [
              { title: 'PyTorch FSDP Tutorial', provider: 'PyTorch Docs', url: 'https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'dl-d4',
        dayRange: 'Day 13 – 16',
        title: 'Multimodal & Audio/Time-Series Deep Learning',
        objective: 'Apply spectrograms, temporal convolutions, and representation learning.',
        topics: [
          {
            id: 'dl-t7',
            title: 'Audio Spectrogram Transformers & Self-Supervised Learning',
            summary: 'Mel-spectrogram patching, masked autoencoders (MAE), and DINOv2.',
            resources: [
              { title: 'Fast.ai Practical Deep Learning for Coders', provider: 'fast.ai', url: 'https://course.fast.ai/', kind: 'Course' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Deep Residual Learning for Image Recognition',
        authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun',
        year: 2015,
        venue: 'CVPR / arXiv:1512.03385',
        url: 'https://arxiv.org/abs/1512.03385',
        takeaway: 'Residual blocks enabled 152+ layer CNNs without optimization degradation.',
      },
      {
        title: 'Attention Is All You Need',
        authors: 'Ashish Vaswani et al.',
        year: 2017,
        venue: 'NeurIPS / arXiv:1706.03762',
        url: 'https://arxiv.org/abs/1706.03762',
        takeaway: 'Replaced recurrence with parallelizable multi-head self-attention.',
      },
      {
        title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)',
        authors: 'Alexey Dosovitskiy et al.',
        year: 2020,
        venue: 'ICLR / arXiv:2010.11929',
        url: 'https://arxiv.org/abs/2010.11929',
        takeaway: 'Showed pure transformers on image patches outperform CNNs at scale.',
      },
      {
        title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
        authors: 'Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré',
        year: 2022,
        venue: 'NeurIPS / arXiv:2205.14135',
        url: 'https://arxiv.org/abs/2205.14135',
        takeaway: 'IO-aware GPU SRAM tiling computes exact attention 2-4x faster with linear memory.',
      },
    ],
    projects: {
      required: [
        {
          title: 'From-Scratch Vision Transformer (ViT) on CIFAR-100',
          tier: 'Required',
          scope: 'Implement patchify, multi-head self-attention, MixUp/CutMix, cosine warmup, and attention-rollout maps.',
          stack: 'PyTorch, Einops, Torchvision',
          resumeBullet: 'Implemented Vision Transformer from scratch with MixUp augmentation and attention rollout visualization reaching 78% CIFAR-100 top-1.',
        },
        {
          title: 'Multimodal Semantic Image Search via CLIP',
          tier: 'Required',
          scope: 'Embed 50k images into a vector index with zero-shot natural language retrieval and hard-negative evaluation.',
          stack: 'PyTorch, OpenCLIP, FAISS',
          resumeBullet: 'Built zero-shot CLIP retrieval system indexing 50k visual assets with sub-15ms cosine similarity lookup.',
        },
      ],
      scalable: [
        {
          title: 'Distributed FSDP Pretraining Harness with Telemetry',
          tier: 'Scalable Capstone',
          scope: 'Multi-GPU training loop supporting bf16 mixed precision, gradient checkpointing, async checkpointing, and throughput MFU tracking.',
          stack: 'PyTorch FSDP, torch.compile, Triton/CUDA',
          resumeBullet: 'Engineered multi-GPU FSDP training harness achieving 48% Model FLOPs Utilization with automated loss-spike recovery.',
        },
        {
          title: 'Real-Time Medical Segmentation & Uncertainty Engine',
          tier: 'Scalable Capstone',
          scope: 'U-Net / SegFormer pipeline with Monte Carlo Dropout uncertainty heatmaps and ONNX INT8 quantization.',
          stack: 'PyTorch, ONNX, TensorRT',
          resumeBullet: 'Quantized SegFormer inference pipeline to INT8 reducing GPU VRAM by 68% while preserving 0.91 Dice score.',
        },
      ],
    },
    certifications: [
      { name: 'Deep Learning Specialization (Free Audit)', issuer: 'DeepLearning.AI via Coursera', url: 'https://www.coursera.org/specializations/deep-learning', costNote: 'Free Audit', focus: 'CNNs, RNNs, Transformers, and hyperparameter tuning' },
      { name: 'Practical Deep Learning for Coders', issuer: 'fast.ai', url: 'https://course.fast.ai/', costNote: '100% Free Course', focus: 'End-to-end PyTorch vision, tabular, and collaborative filtering' },
      { name: 'PyTorch Official Learning Pathways', issuer: 'Linux Foundation / PyTorch', url: 'https://pytorch.org/tutorials/', costNote: '100% Free', focus: 'Distributed training, torch.compile, and custom operators' },
    ],
    flashcards: [
      { id: 'dl-fc1', topicId: 'dl-t3', topicTitle: 'Scaled Dot-Product Attention', question: 'Why divide QK^T by sqrt(d_k) before applying softmax?', answer: 'For large d_k, dot-product variance grows as d_k, pushing softmax into near-zero gradient saturation zones.', difficulty: 'Core' },
      { id: 'dl-fc2', topicId: 'dl-t4', topicTitle: 'FlashAttention', question: 'How does FlashAttention compute exact softmax without materializing the N x N attention matrix in HBM?', answer: 'It uses online softmax rescaling across tiled Q, K, V blocks kept inside fast on-chip GPU SRAM.', difficulty: 'Deep Dive' },
      { id: 'dl-fc3', topicId: 'dl-t1', topicTitle: 'Vision Transformers', question: 'Why do vanilla ViTs need more data than ResNets to generalize well?', answer: 'ViTs lack translation equivariance and locality inductive biases, so they must learn spatial structure from data.', difficulty: 'Applied' },
      { id: 'dl-fc4', topicId: 'dl-t5', topicTitle: 'Mixed Precision BF16', question: 'Why is BF16 generally safer than FP16 for deep neural network training?', answer: 'BF16 retains FP32’s 8-bit exponent range, preventing overflow/underflow without needing dynamic loss scaling.', difficulty: 'Applied' },
      { id: 'dl-fc5', topicId: 'dl-t6', topicTitle: 'DDP vs FSDP', question: 'How does FSDP (ZeRO-3) cut per-GPU memory compared to DDP?', answer: 'FSDP shards model parameters, gradients, and optimizer states across ranks, gathering weights only on demand per layer.', difficulty: 'Deep Dive' },
      { id: 'dl-fc6', topicId: 'dl-t2', topicTitle: 'CLIP Contrastive Loss', question: 'What does InfoNCE maximize in a batch of N image-text pairs?', answer: 'It maximizes cosine similarity along the N diagonal matched pairs while pushing apart all N^2 - N mismatched pairs.', difficulty: 'Core' },
      { id: 'dl-fc7', topicId: 'dl-t5', topicTitle: 'Gradient Checkpointing', question: 'What is the trade-off of activation checkpointing?', answer: 'It slashes activation memory by discarding intermediate activations and recomputing them during the backward pass (~25% extra compute).', difficulty: 'Applied' },
      { id: 'dl-fc8', topicId: 'dl-t7', topicTitle: 'Self-Supervised Learning', question: 'What causes representation collapse in Siamese self-supervised learning and how is it avoided?', answer: 'All inputs mapping to a constant vector minimizes loss; avoided via contrastive negatives, stop-gradient asymmetry, or centering.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'llm',
    title: 'Large Language Models (LLMs)',
    aliases: ['LLM', 'Foundation Models', 'RLHF', 'RAG'],
    domain: 'ai-ml',
    summary:
      'Decoder-only Transformer pretraining, tokenization, LoRA/QLoRA fine-tuning, DPO/RLHF alignment, KV-cache inference, and evaluation.',
    estimatedDays: 14,
    tier: 3,
    prerequisites: ['deep-learning', 'python-dsa'],
    unlocks: ['gen-ai', 'agentic-ai', 'mlops'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'llm-d1',
        dayRange: 'Day 1 – 4',
        title: 'Tokenization, Architecture & Scaling Laws',
        objective: 'Understand BPE, GQA, SwiGLU, and Chinchilla compute-optimal scaling.',
        topics: [
          {
            id: 'llm-t1',
            title: 'Byte-Pair Encoding (BPE) & SentencePiece Tokenizers',
            summary: 'Subword vocabulary compression, UTF-8 byte fallback, and fertility metrics.',
            resources: [
              { title: 'Let’s Build the GPT Tokenizer', provider: 'Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', kind: 'Course' },
              { title: 'Hugging Face Tokenizers Guide', provider: 'Hugging Face', url: 'https://huggingface.co/docs/tokenizers/index', kind: 'Docs' },
            ],
          },
          {
            id: 'llm-t2',
            title: 'Modern Decoder Blocks: RMSNorm, SwiGLU, RoPE & GQA',
            summary: 'Grouped-Query Attention for KV-cache reduction and gated FFN layers.',
            resources: [
              { title: 'Hugging Face LLM Course', provider: 'Hugging Face', url: 'https://huggingface.co/learn/nlp-course', kind: 'Course' },
            ],
          },
        ],
      },
      {
        id: 'llm-d2',
        dayRange: 'Day 5 – 8',
        title: 'Post-Training: SFT, LoRA & Preference Alignment',
        objective: 'Specialize open-weights models efficiently with PEFT and DPO.',
        topics: [
          {
            id: 'llm-t3',
            title: 'LoRA, QLoRA (NF4) & Parameter-Efficient Fine-Tuning',
            summary: 'Low-rank adapter decomposition W + BA and 4-bit NormalFloat quantization.',
            resources: [
              { title: 'PEFT Library Documentation', provider: 'Hugging Face', url: 'https://huggingface.co/docs/peft/index', kind: 'Docs' },
            ],
          },
          {
            id: 'llm-t4',
            title: 'RLHF, PPO & Direct Preference Optimization (DPO)',
            summary: 'Aligning outputs to human preference pairs without fragile reward model loops.',
            resources: [
              { title: 'TRL (Transformer Reinforcement Learning) Docs', provider: 'Hugging Face', url: 'https://huggingface.co/docs/trl/index', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'llm-d3',
        dayRange: 'Day 9 – 11',
        title: 'Inference Serving, KV Cache & Quantization',
        objective: 'Optimize tokens/sec and Time-To-First-Token at production scale.',
        topics: [
          {
            id: 'llm-t5',
            title: 'PagedAttention, Continuous Batching & Speculative Decoding',
            summary: 'Eliminate KV-cache fragmentation with virtual memory paging (vLLM).',
            resources: [
              { title: 'vLLM Architecture & PagedAttention', provider: 'vLLM Docs', url: 'https://docs.vllm.ai/en/latest/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'llm-d4',
        dayRange: 'Day 12 – 14',
        title: 'Hybrid RAG & Automated Evals',
        objective: 'Combine BM25 + dense vectors + rerankers with deterministic eval harnesses.',
        topics: [
          {
            id: 'llm-t6',
            title: 'Hybrid Retrieval, Cross-Encoder Reranking & LLM-as-Judge',
            summary: 'Reciprocal Rank Fusion, chunk provenance, and faithfulness metrics.',
            resources: [
              { title: 'LM Evaluation Harness', provider: 'EleutherAI', url: 'https://github.com/EleutherAI/lm-evaluation-harness', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Language Models are Few-Shot Learners (GPT-3)',
        authors: 'Tom B. Brown et al.',
        year: 2020,
        venue: 'NeurIPS / arXiv:2005.14165',
        url: 'https://arxiv.org/abs/2005.14165',
        takeaway: 'Established in-context learning as an emergent property of scale.',
      },
      {
        title: 'Training Compute-Optimal Large Language Models (Chinchilla)',
        authors: 'Jordan Hoffmann et al.',
        year: 2022,
        venue: 'arXiv:2203.15556',
        url: 'https://arxiv.org/abs/2203.15556',
        takeaway: 'Showed parameters and training tokens should scale equally (~20 tokens per parameter).',
      },
      {
        title: 'LoRA: Low-Rank Adaptation of Large Language Models',
        authors: 'Edward J. Hu et al.',
        year: 2021,
        venue: 'ICLR / arXiv:2106.09685',
        url: 'https://arxiv.org/abs/2106.09685',
        takeaway: 'Freezes pretrained weights and trains rank-r adapters with zero inference latency overhead.',
      },
      {
        title: 'Direct Preference Optimization: Your Language Model is Secretly a Reward Model',
        authors: 'Rafael Rafailov et al.',
        year: 2023,
        venue: 'NeurIPS / arXiv:2305.18290',
        url: 'https://arxiv.org/abs/2305.18290',
        takeaway: 'Replaces RLHF PPO loops with a closed-form binary cross-entropy preference objective.',
      },
    ],
    projects: {
      required: [
        {
          title: 'NanoGPT BPE + Transformer Pretraining Lab',
          tier: 'Required',
          scope: 'Train a 124M decoder-only Transformer with RoPE, GQA, and custom BPE tokenizer on curated domain text.',
          stack: 'PyTorch, tiktoken, Weights & Biases',
          resumeBullet: 'Built a 124M-parameter decoder Transformer from scratch with RoPE and GQA, cutting KV-cache memory by 4x.',
        },
        {
          title: 'Domain-Specialized QLoRA + DPO Fine-Tuning Pipeline',
          tier: 'Required',
          scope: 'Fine-tune an open 7B/8B model on curated instruction + preference pairs and benchmark against base model.',
          stack: 'PyTorch, Hugging Face PEFT, TRL, bitsandbytes',
          resumeBullet: 'Aligned an 8B open-weights model via QLoRA and DPO, improving domain benchmark accuracy by 21% on a single 24GB GPU.',
        },
      ],
      scalable: [
        {
          title: 'High-Throughput Hybrid RAG Engine with Citation Verification',
          tier: 'Scalable Capstone',
          scope: 'BM25 + dense embedding fusion, cross-encoder reranker, vLLM serving, and automated hallucination scoring.',
          stack: 'vLLM, Qdrant, FastAPI, BGE-Reranker',
          resumeBullet: 'Architected hybrid RAG system over 1M technical docs achieving 94% citation precision and <450ms TTFT via vLLM.',
        },
        {
          title: 'Custom Speculative Decoding & Quantization Benchmark Suite',
          tier: 'Scalable Capstone',
          scope: 'Measure throughput, perplexity, and memory bandwidth across FP16, AWQ, GGUF, and draft-model speculative decoding.',
          stack: 'vLLM, llama.cpp, Prometheus',
          resumeBullet: 'Achieved 2.3x token generation speedup via draft-model speculative decoding with zero output quality regression.',
        },
      ],
    },
    certifications: [
      { name: 'Hugging Face LLM Course', issuer: 'Hugging Face', url: 'https://huggingface.co/learn/nlp-course', costNote: '100% Free', focus: 'Transformers, tokenizers, fine-tuning, and datasets' },
      { name: 'Generative AI with Large Language Models (Free Audit)', issuer: 'AWS & DeepLearning.AI via Coursera', url: 'https://www.coursera.org/learn/generative-ai-with-llms', costNote: 'Free Audit', focus: 'LLM lifecycle, RLHF, and deployment trade-offs' },
      { name: 'Full Stack LLM Bootcamp', issuer: 'The Full Stack (Free Open Curriculum)', url: 'https://fullstackdeeplearning.com/llm-bootcamp/', costNote: '100% Free', focus: 'Prompt engineering, LLMOps, UX, and evaluation' },
    ],
    flashcards: [
      { id: 'llm-fc1', topicId: 'llm-t1', topicTitle: 'Tokenization (BPE)', question: 'Why do LLMs often struggle with character-level counting or arithmetic on numbers?', answer: 'BPE merges frequent substrings into multi-character tokens, hiding individual character or digit boundaries from the model.', difficulty: 'Core' },
      { id: 'llm-fc2', topicId: 'llm-t2', topicTitle: 'GQA & KV Cache', question: 'How does Grouped-Query Attention (GQA) accelerate autoregressive decoding?', answer: 'Multiple query heads share fewer key/value heads, shrinking KV-cache memory bandwidth requirements during token-by-token generation.', difficulty: 'Applied' },
      { id: 'llm-fc3', topicId: 'llm-t3', topicTitle: 'LoRA & QLoRA', question: 'Why does LoRA introduce zero extra latency during inference after training?', answer: 'Because the low-rank product B*A can be merged directly into the base weight matrix W0 = W0 + BA.', difficulty: 'Core' },
      { id: 'llm-fc4', topicId: 'llm-t4', topicTitle: 'DPO Alignment', question: 'What is the core simplification of DPO compared to PPO-based RLHF?', answer: 'DPO eliminates fitting an explicit reward model and sampling online rollouts by optimizing a direct closed-form preference loss.', difficulty: 'Applied' },
      { id: 'llm-fc5', topicId: 'llm-t5', topicTitle: 'PagedAttention & vLLM', question: 'What problem does PagedAttention solve in LLM serving?', answer: 'It eliminates internal/external KV-cache memory fragmentation by storing keys/values in non-contiguous fixed-size blocks.', difficulty: 'Deep Dive' },
      { id: 'llm-fc6', topicId: 'llm-t5', topicTitle: 'Speculative Decoding', question: 'How does speculative decoding guarantee the exact same output distribution as the target model?', answer: 'A fast draft model proposes k tokens and the target model verifies all k in one parallel forward pass using rejection sampling.', difficulty: 'Deep Dive' },
      { id: 'llm-fc7', topicId: 'llm-t6', topicTitle: 'Hybrid RAG', question: 'Why combine BM25 sparse search with dense vector embeddings?', answer: 'Dense vectors capture semantic synonyms while BM25 catches exact part numbers, acronyms, and rare proper nouns.', difficulty: 'Core' },
      { id: 'llm-fc8', topicId: 'llm-t2', topicTitle: 'Chinchilla Scaling', question: 'What is the Chinchilla rule of thumb for compute-optimal pretraining?', answer: 'Scale training tokens proportionally to model parameters (~20 tokens per parameter) rather than scaling parameters alone.', difficulty: 'Applied' },
    ],
  },
  {
    id: 'gen-ai',
    title: 'Generative AI',
    aliases: ['Gen Ai', 'Diffusion Models', 'Multimodal GenAI'],
    domain: 'ai-ml',
    summary:
      'Diffusion & flow matching models, VAEs, LoRA style conditioning, multimodal synthesis (image, audio, video), and structured generation.',
    estimatedDays: 12,
    tier: 3,
    prerequisites: ['deep-learning', 'llm'],
    unlocks: ['agentic-ai', 'blender-3d-rendering', 'video-filmmaking-music'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'gen-d1',
        dayRange: 'Day 1 – 3',
        title: 'VAEs, Denoising Diffusion & Flow Matching',
        objective: 'Understand ELBO, DDPM noise schedules, and rectified flows.',
        topics: [
          {
            id: 'gen-t1',
            title: 'Variational Autoencoders & Latent Diffusion Spaces',
            summary: 'KL regularization, perceptual loss, and compressing pixels to latent manifolds.',
            resources: [
              { title: 'Hugging Face Diffusion Course', provider: 'Hugging Face', url: 'https://huggingface.co/learn/diffusion-course', kind: 'Course' },
            ],
          },
          {
            id: 'gen-t2',
            title: 'DDPM, DDIM & Rectified Flow Matching',
            summary: 'Forward SDE noising vs deterministic ODE straight-line velocity fields.',
            resources: [
              { title: 'What are Diffusion Models?', provider: 'Lilian Weng', url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'gen-d2',
        dayRange: 'Day 4 – 6',
        title: 'Conditioning, CFG & ControlNets',
        objective: 'Steer visual and audio generation with Classifier-Free Guidance and spatial controls.',
        topics: [
          {
            id: 'gen-t3',
            title: 'Classifier-Free Guidance (CFG) & Cross-Attention Conditioning',
            summary: 'Balance diversity vs prompt adherence via conditional/unconditional extrapolation.',
            resources: [
              { title: 'Diffusers Library Documentation', provider: 'Hugging Face', url: 'https://huggingface.co/docs/diffusers/index', kind: 'Docs' },
            ],
          },
          {
            id: 'gen-t4',
            title: 'ControlNet, IP-Adapter & DreamBooth/LoRA Personalization',
            summary: 'Zero-convolutions for depth/canny/pose conditioning without forgetting priors.',
            resources: [
              { title: 'ControlNet in Diffusers', provider: 'Hugging Face', url: 'https://huggingface.co/docs/diffusers/using-diffusers/controlnet', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'gen-d3',
        dayRange: 'Day 7 – 9',
        title: 'Structured Text, Audio & Video Synthesis',
        objective: 'Apply constrained decoding, neural audio codecs, and temporal attention.',
        topics: [
          {
            id: 'gen-t5',
            title: 'Constrained JSON/Grammar Decoding & Multimodal Generation',
            summary: 'Logit masking with finite-state machines and multimodal token interleaving.',
            resources: [
              { title: 'Outlines Structured Generation', provider: 'Outlines Docs', url: 'https://dottxt-ai.github.io/outlines/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'gen-d4',
        dayRange: 'Day 10 – 12',
        title: 'Safety, Watermarking & GenAI Evaluation',
        objective: 'Evaluate outputs with FID, CLIPScore, and provenance standards.',
        topics: [
          {
            id: 'gen-t6',
            title: 'FID, CLIPScore, C2PA Provenance & Guardrails',
            summary: 'Detect distribution collapse, prompt injection, and verify synthetic media lineage.',
            resources: [
              { title: 'C2PA Content Credentials Spec', provider: 'C2PA', url: 'https://c2pa.org/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Denoising Diffusion Probabilistic Models (DDPM)',
        authors: 'Jonathan Ho, Ajay Jain, Pieter Abbeel',
        year: 2020,
        venue: 'NeurIPS / arXiv:2006.11239',
        url: 'https://arxiv.org/abs/2006.11239',
        takeaway: 'Formulated high-fidelity image synthesis via iterative noise prediction.',
      },
      {
        title: 'High-Resolution Image Synthesis with Latent Diffusion Models',
        authors: 'Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, Björn Ommer',
        year: 2022,
        venue: 'CVPR / arXiv:2112.10752',
        url: 'https://arxiv.org/abs/2112.10752',
        takeaway: 'Moved diffusion into a perceptual VAE latent space, enabling Stable Diffusion.',
      },
      {
        title: 'Adding Conditional Control to Text-to-Image Diffusion Models (ControlNet)',
        authors: 'Lvmin Zhang, Anyi Rao, Maneesh Agrawala',
        year: 2023,
        venue: 'ICCV / arXiv:2302.05543',
        url: 'https://arxiv.org/abs/2302.05543',
        takeaway: 'Uses zero-initialized convolutions to inject spatial edge/depth/pose constraints cleanly.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Mini-DDPM & Rectified Flow Trainer on MNIST/Sprites',
          tier: 'Required',
          scope: 'Implement forward/reverse diffusion schedule, UNet with sinusoidal time embeddings, and CFG sampling.',
          stack: 'PyTorch, Diffusers, Einops',
          resumeBullet: 'Implemented UNet denoising diffusion and classifier-free guidance sampler from scratch in PyTorch.',
        },
        {
          title: 'Schema-Guaranteed Multimodal Extractor',
          tier: 'Required',
          scope: 'Build an invoice/diagram parser using FSM-constrained JSON decoding with zero schema validation failures.',
          stack: 'Python, Outlines, Pydantic, Open Weights VLM',
          resumeBullet: 'Engineered grammar-constrained multimodal extraction pipeline guaranteeing 100% valid Pydantic JSON outputs.',
        },
      ],
      scalable: [
        {
          title: 'ControlNet Product Studio Pipeline with LoRA Conditioning',
          tier: 'Scalable Capstone',
          scope: 'Depth + canny conditioned product relighting workflow packaged with async worker queue and S3 storage.',
          stack: 'PyTorch, Diffusers, Celery, Redis, FastAPI',
          resumeBullet: 'Built distributed ControlNet + LoRA studio pipeline generating brand-consistent product renders in <4s per asset.',
        },
        {
          title: 'GenAI Media Provenance & Eval Benchmark Platform',
          tier: 'Scalable Capstone',
          scope: 'Automated CLIPScore, aesthetic score, and C2PA metadata signing pipeline across model checkpoints.',
          stack: 'Python, TorchMetrics, C2PA, FastAPI',
          resumeBullet: 'Automated perceptual evaluation (FID/CLIPScore) and C2PA provenance signing for multi-checkpoint visual synthesis.',
        },
      ],
    },
    certifications: [
      { name: 'Hugging Face Diffusion Models Course', issuer: 'Hugging Face', url: 'https://huggingface.co/learn/diffusion-course', costNote: '100% Free', focus: 'DDPMs, latent diffusion, ControlNet, and fine-tuning' },
      { name: 'Generative AI Learning Path', issuer: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/paths/118', costNote: 'Free Badges & Labs', focus: 'Diffusion, encoder-decoder, attention, and GenAI Studio' },
      { name: 'DeepLearning.AI Short Courses (Diffusion & Multimodal)', issuer: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/short-courses/', costNote: 'Free Short Courses', focus: 'How diffusion works and multimodal prompting' },
    ],
    flashcards: [
      { id: 'gen-fc1', topicId: 'gen-t1', topicTitle: 'Latent Diffusion', question: 'Why does Stable Diffusion run denoising in a VAE latent space instead of pixel space?', answer: 'Pixel space wastes compute on imperceptible high-frequency details; a 8x compressed latent space slashes memory and FLOPs by ~48x.', difficulty: 'Core' },
      { id: 'gen-fc2', topicId: 'gen-t3', topicTitle: 'Classifier-Free Guidance', question: 'What happens when the CFG guidance scale is pushed too high (e.g., >15)?', answer: 'Images become over-saturated, high-contrast, and lose diversity due to extreme conditional extrapolation.', difficulty: 'Applied' },
      { id: 'gen-fc3', topicId: 'gen-t2', topicTitle: 'Flow Matching vs DDPM', question: 'Why do Rectified Flow models require fewer sampling steps than standard DDPMs?', answer: 'Flow matching learns straighter ODE velocity paths between noise and data, minimizing discretization curvature error.', difficulty: 'Deep Dive' },
      { id: 'gen-fc4', topicId: 'gen-t4', topicTitle: 'ControlNet', question: 'Why does ControlNet use zero-initialized 1x1 convolutions?', answer: 'At step 0 of fine-tuning, zero-convs output zero so the pretrained diffusion backbone is completely undisturbed before gradients adapt.', difficulty: 'Applied' },
      { id: 'gen-fc5', topicId: 'gen-t5', topicTitle: 'Constrained Decoding', question: 'How does FSM-guided decoding enforce valid JSON with zero retries?', answer: 'At each step, a finite-state machine masks out all vocabulary logits that cannot continue a valid JSON grammar state.', difficulty: 'Core' },
      { id: 'gen-fc6', topicId: 'gen-t6', topicTitle: 'FID Metric', question: 'What does Fréchet Inception Distance (FID) measure?', answer: 'The Wasserstein-2 distance between Gaussian approximations of real and generated Inception-v3 feature distributions (lower is better).', difficulty: 'Core' },
      { id: 'gen-fc7', topicId: 'gen-t1', topicTitle: 'VAE Reparameterization', question: 'Why is the reparameterization trick (z = mu + sigma * eps) needed in VAEs?', answer: 'Sampling directly from N(mu, sigma) blocks backpropagation; isolating randomness in eps lets gradients flow through mu and sigma.', difficulty: 'Applied' },
      { id: 'gen-fc8', topicId: 'gen-t6', topicTitle: 'C2PA Provenance', question: 'How does C2PA protect provenance even when images are cropped or shared?', answer: 'It embeds cryptographically signed manifests binding asset hashes and edit history, paired with durable soft-binding watermarks.', difficulty: 'Deep Dive' },
    ],
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    aliases: ['Agentic Ai', 'AI Agents', 'Tool Use', 'MCP'],
    domain: 'ai-ml',
    summary:
      'Autonomous reasoning loops, tool-calling protocols (MCP), stateful agent graphs, persistent memory, multi-agent orchestration, and guardrails.',
    estimatedDays: 12,
    tier: 4,
    prerequisites: ['llm', 'gen-ai', 'web-apis'],
    unlocks: ['mlops', 'forward-deployed-eng', 'vibe-coding-automation'],
    cardHeightHint: 'tall',
    dayModules: [
      {
        id: 'ag-d1',
        dayRange: 'Day 1 – 3',
        title: 'ReAct Loops, Tool Calling & Sandboxed Execution',
        objective: 'Build deterministic observe-think-act loops with typed tool schemas.',
        topics: [
          {
            id: 'ag-t1',
            title: 'ReAct, Plan-and-Execute & Reflexion Architectures',
            summary: 'Interleaving chain-of-thought reasoning traces with real environment feedback.',
            resources: [
              { title: 'Building Effective Agents', provider: 'Anthropic Engineering', url: 'https://www.anthropic.com/research/building-effective-agents', kind: 'Guide' },
              { title: 'LLM Powered Autonomous Agents', provider: 'Lilian Weng', url: 'https://lilianweng.github.io/posts/2023-06-23-agent/', kind: 'Guide' },
            ],
          },
          {
            id: 'ag-t2',
            title: 'Model Context Protocol (MCP) & Typed Tool Contracts',
            summary: 'Standardized tool, resource, and prompt discovery across agent runtimes.',
            resources: [
              { title: 'Model Context Protocol Specification', provider: 'MCP Docs', url: 'https://modelcontextprotocol.io/introduction', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ag-d2',
        dayRange: 'Day 4 – 6',
        title: 'Stateful Workflows & Multi-Agent Orchestration',
        objective: 'Design cyclic state machines with human-in-the-loop checkpoints.',
        topics: [
          {
            id: 'ag-t3',
            title: 'Cyclic Agent Graphs, Checkpointing & Human-in-the-Loop',
            summary: 'Resumable durable execution, approval gates, and bounded retry budgets.',
            resources: [
              { title: 'LangGraph Concepts & State Machines', provider: 'LangGraph Docs', url: 'https://langchain-ai.github.io/langgraph/concepts/', kind: 'Docs' },
            ],
          },
          {
            id: 'ag-t4',
            title: 'Supervisor, Swarm & Handoff Multi-Agent Patterns',
            summary: 'Context isolation between planner, researcher, coder, and verifier roles.',
            resources: [
              { title: 'Hugging Face Smolagents Guide', provider: 'Hugging Face', url: 'https://huggingface.co/docs/smolagents/index', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ag-d3',
        dayRange: 'Day 7 – 9',
        title: 'Long-Term Memory & Computer/Browser Use',
        objective: 'Implement episodic/semantic memory stores and safe sandboxed code/browser tools.',
        topics: [
          {
            id: 'ag-t5',
            title: 'Episodic, Semantic & Procedural Agent Memory (MemGPT Pattern)',
            summary: 'Context window compaction, knowledge graphs, and memory consolidation.',
            resources: [
              { title: 'Letta (MemGPT) Memory Architecture', provider: 'Letta Docs', url: 'https://docs.letta.com/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'ag-d4',
        dayRange: 'Day 10 – 12',
        title: 'Agent Evals, Prompt Injection Defense & Cost Caps',
        objective: 'Harden agents against indirect prompt injection and infinite loop blowups.',
        topics: [
          {
            id: 'ag-t6',
            title: 'Trajectory Evaluation, Sandboxing & Prompt-Injection Guardrails',
            summary: 'Evaluate tool selection accuracy, step efficiency, and least-privilege permissions.',
            resources: [
              { title: 'OWASP Top 10 for LLM & Agentic Apps', provider: 'OWASP', url: 'https://genai.owasp.org/llm-top-10/', kind: 'Guide' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
        authors: 'Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao',
        year: 2022,
        venue: 'ICLR / arXiv:2210.03629',
        url: 'https://arxiv.org/abs/2210.03629',
        takeaway: 'Interleaving verbal reasoning with environment actions cuts hallucination in multi-hop tasks.',
      },
      {
        title: 'Toolformer: Language Models Can Teach Themselves to Use Tools',
        authors: 'Timo Schick et al.',
        year: 2023,
        venue: 'NeurIPS / arXiv:2302.04761',
        url: 'https://arxiv.org/abs/2302.04761',
        takeaway: 'Models learn self-supervised API call insertion based on loss reduction.',
      },
      {
        title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
        authors: 'Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao',
        year: 2023,
        venue: 'NeurIPS / arXiv:2303.11366',
        url: 'https://arxiv.org/abs/2303.11366',
        takeaway: 'Episodic self-reflection memory dramatically boosts coding and reasoning pass rates.',
      },
    ],
    projects: {
      required: [
        {
          title: 'MCP-Enabled Autonomous Research & Citation Agent',
          tier: 'Required',
          scope: 'Build a bounded ReAct loop exposing custom MCP search/SQL/file tools with deterministic trajectory logs.',
          stack: 'TypeScript/Python, MCP SDK, Zod/Pydantic',
          resumeBullet: 'Built an MCP-compliant research agent with typed tool contracts and automated source-grounding verification.',
        },
        {
          title: 'Human-in-the-Loop Incident Triage Graph',
          tier: 'Required',
          scope: 'Stateful workflow inspecting server logs, proposing remediation PRs, and pausing for human approval before execution.',
          stack: 'Python, LangGraph, SQLite Checkpointer',
          resumeBullet: 'Designed resumable incident-triage agent graph with human approval gates and 100% audit trace persistence.',
        },
      ],
      scalable: [
        {
          title: 'Sandboxed Autonomous Software Engineering Agent',
          tier: 'Scalable Capstone',
          scope: 'Docker-isolated code editing, test-runner loop, Reflexion self-critique, and SWE-bench style pass@1 harness.',
          stack: 'Python, Docker SDK, Tree-sitter, OpenTelemetry',
          resumeBullet: 'Engineered containerized coding agent with Reflexion test-repair loop achieving 2.1x higher task resolution on repo benchmarks.',
        },
        {
          title: 'Multi-Agent Financial & Compliance Analyst Swarm',
          tier: 'Scalable Capstone',
          scope: 'Orchestrate SEC filing extractor, quant calculator, and compliance verifier agents with token budget circuit breakers.',
          stack: 'Python, FastAPI, Redis, OpenTelemetry',
          resumeBullet: 'Deployed multi-agent analyst pipeline with isolated context windows and least-privilege tool RBAC cutting review time by 70%.',
        },
      ],
    },
    certifications: [
      { name: 'AI Agents in LangGraph & Multi-Agent Systems', issuer: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/short-courses/', costNote: 'Free Short Courses', focus: 'Cyclic state graphs, memory, and agentic workflows' },
      { name: 'Hugging Face AI Agents Course', issuer: 'Hugging Face', url: 'https://huggingface.co/learn/agents-course', costNote: '100% Free Certificate', focus: 'Tool calling, smolagents, and agent evaluation' },
      { name: 'Building with Model Context Protocol (MCP)', issuer: 'Anthropic / DeepLearning.AI', url: 'https://www.deeplearning.ai/short-courses/', costNote: 'Free Short Course', focus: 'Standardized agent tool & context servers' },
    ],
    flashcards: [
      { id: 'ag-fc1', topicId: 'ag-t1', topicTitle: 'ReAct Architecture', question: 'Why separate Reasoning traces from Actions in an agent loop?', answer: 'Explicit reasoning steps keep plans grounded in observations and prevent blind hallucinated tool calls.', difficulty: 'Core' },
      { id: 'ag-fc2', topicId: 'ag-t2', topicTitle: 'MCP Protocol', question: 'What problem does Model Context Protocol (MCP) solve for AI applications?', answer: 'It standardizes how models connect to external tools, data resources, and prompts via a single client-server protocol instead of N*M custom integrations.', difficulty: 'Core' },
      { id: 'ag-fc3', topicId: 'ag-t3', topicTitle: 'Stateful Graphs', question: 'Why is a cyclic graph with explicit state superior to a linear chain for complex agents?', answer: 'Agents need iterative retries, verification branches, and durable checkpoints to pause for human approval or recover from tool errors.', difficulty: 'Applied' },
      { id: 'ag-fc4', topicId: 'ag-t4', topicTitle: 'Context Isolation', question: 'Why pass summarized handoffs rather than full raw histories between sub-agents?', answer: 'Raw tool outputs bloat context, dilute attention ("context rot"), and spike token latency.', difficulty: 'Applied' },
      { id: 'ag-fc5', topicId: 'ag-t5', topicTitle: 'Episodic Memory', question: 'What distinguishes semantic memory from episodic memory in an AI agent?', answer: 'Semantic memory stores general facts/preferences; episodic memory stores specific past task trajectories, failures, and lessons learned.', difficulty: 'Core' },
      { id: 'ag-fc6', topicId: 'ag-t6', topicTitle: 'Indirect Prompt Injection', question: 'How does indirect prompt injection attack an agent, and what is the primary defense?', answer: 'Malicious instructions hidden in fetched webpages/emails hijack tool calls; defended by least-privilege tool scoping, sanitization, and human confirmation for destructive actions.', difficulty: 'Deep Dive' },
      { id: 'ag-fc7', topicId: 'ag-t6', topicTitle: 'Trajectory Evaluation', question: 'Why is final-answer accuracy alone insufficient for evaluating agents?', answer: 'An agent might get lucky after 25 expensive retries or unsafe tool calls; trajectory evals measure tool precision, step count, and cost.', difficulty: 'Applied' },
      { id: 'ag-fc8', topicId: 'ag-t1', topicTitle: 'Workflow vs Agent', question: 'When should you choose a deterministic workflow over an autonomous agent?', answer: 'Whenever steps are predictable and well-defined—workflows offer lower latency, lower cost, and higher reliability.', difficulty: 'Core' },
    ],
  },
  {
    id: 'mlops',
    title: 'MLOps',
    aliases: ['MLOPs', 'ML Platform', 'Model Serving'],
    domain: 'ai-ml',
    summary:
      'Experiment tracking, feature stores, data/model versioning, reproducible training DAGs, GPU model serving, canary rollouts, and drift monitoring.',
    estimatedDays: 12,
    tier: 4,
    prerequisites: ['ai-ml', 'devops', 'cloud'],
    unlocks: ['forward-deployed-eng', 'system-design'],
    cardHeightHint: 'medium',
    dayModules: [
      {
        id: 'mlops-d1',
        dayRange: 'Day 1 – 3',
        title: 'Reproducibility, Data Versioning & Experiment Tracking',
        objective: 'Track datasets, code commits, hyperparameters, and artifacts deterministically.',
        topics: [
          {
            id: 'mlops-t1',
            title: 'DVC, LakeFS & MLflow Model Registry',
            summary: 'Content-addressed dataset lineage and stage-gated model promotion.',
            resources: [
              { title: 'MLflow Tracking & Registry Docs', provider: 'MLflow', url: 'https://mlflow.org/docs/latest/index.html', kind: 'Docs' },
              { title: 'Made With ML (MLOps Curriculum)', provider: 'Goku Mohandas', url: 'https://madewithml.com/', kind: 'Course' },
            ],
          },
          {
            id: 'mlops-t2',
            title: 'Feature Stores & Training-Serving Skew Prevention',
            summary: 'Point-in-time joins for offline training vs online low-latency Redis lookup.',
            resources: [
              { title: 'Feast Feature Store Concepts', provider: 'Feast Docs', url: 'https://docs.feast.io/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'mlops-d2',
        dayRange: 'Day 4 – 6',
        title: 'Orchestration & Continuous Training (CT)',
        objective: 'Automate validation, retraining, and evaluation gates in CI/CD.',
        topics: [
          {
            id: 'mlops-t3',
            title: 'DAG Orchestration (Prefect / Airflow / Kubeflow)',
            summary: 'Idempotent data validation, model training, and automated promotion pipelines.',
            resources: [
              { title: 'Chip Huyen: Designing Machine Learning Systems Notes', provider: 'Chip Huyen', url: 'https://huyenchip.com/blog/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'mlops-d3',
        dayRange: 'Day 7 – 9',
        title: 'High-Performance Serving & Hardware Optimization',
        objective: 'Serve models via ONNX, Triton, vLLM, and dynamic batching.',
        topics: [
          {
            id: 'mlops-t4',
            title: 'Triton Inference Server, ONNX & Dynamic Batching',
            summary: 'Maximize GPU utilization via concurrent model execution and tensor quantization.',
            resources: [
              { title: 'NVIDIA Triton Inference Server Docs', provider: 'NVIDIA', url: 'https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'mlops-d4',
        dayRange: 'Day 10 – 12',
        title: 'Monitoring, Shadow Deployments & Drift Recovery',
        objective: 'Detect covariate shift, concept drift, and silent pipeline failures.',
        topics: [
          {
            id: 'mlops-t5',
            title: 'Shadow/Canary Rollouts, PSI/KL Drift & Feedback Loops',
            summary: 'Compare challenger vs champion models on live traffic without user impact.',
            resources: [
              { title: 'Evidently AI ML Monitoring Guides', provider: 'Evidently', url: 'https://docs.evidentlyai.com/', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Hidden Technical Debt in Machine Learning Systems',
        authors: 'D. Sculley et al.',
        year: 2015,
        venue: 'NeurIPS',
        url: 'https://papers.nips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html',
        takeaway: 'Identified CACE ("Changing Anything Changes Everything"), data dependencies, and glue code debt.',
      },
      {
        title: 'TFX: A TensorFlow-Based Production-Scale Machine Learning Platform',
        authors: 'Denis Baylor et al.',
        year: 2017,
        venue: 'KDD',
        url: 'https://dl.acm.org/doi/10.1145/3097983.3098021',
        takeaway: 'Blueprinted schema validation, continuous training, and serving skew checks at Google scale.',
      },
      {
        title: 'MLOps: Continuous Delivery and Automation Pipelines in Machine Learning',
        authors: 'Google Cloud Architecture Research',
        year: 2020,
        venue: 'Google Cloud Whitepaper',
        url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning',
        takeaway: 'Defined MLOps Maturity Levels 0, 1, and 2 for automated CT/CI/CD.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Reproducible MLflow + DVC Training & Registry Pipeline',
          tier: 'Required',
          scope: 'Version datasets in DVC, track experiments in MLflow, and promote models automatically if F1 beats baseline.',
          stack: 'Python, MLflow, DVC, GitHub Actions, Docker',
          resumeBullet: 'Automated reproducible ML training and stage-gated promotion using DVC, MLflow, and GitHub Actions.',
        },
        {
          title: 'Point-in-Time Feature Store & Validation Suite',
          tier: 'Required',
          scope: 'Eliminate data leakage with Feast offline/online stores and Great Expectations schema assertions.',
          stack: 'Feast, Redis, Parquet, Great Expectations',
          resumeBullet: 'Eliminated training-serving skew across 35 real-time features using Feast point-in-time joins.',
        },
      ],
      scalable: [
        {
          title: 'Canary Model Serving Mesh with Automated Drift Rollback',
          tier: 'Scalable Capstone',
          scope: 'Serve ONNX/Triton models behind traffic splitter with Prometheus latency/PSI monitors and auto-rollback.',
          stack: 'Triton/ONNX, FastAPI, Kubernetes, Prometheus, Grafana',
          resumeBullet: 'Built canary inference platform serving 2,000 RPS with automated PSI drift detection and sub-30s rollback.',
        },
        {
          title: 'Continuous LLM Evaluation & Prompt Regression CI Gate',
          tier: 'Scalable Capstone',
          scope: 'Run automated golden-set evals on every PR changing prompts, retrievers, or model weights.',
          stack: 'Python, GitHub Actions, OpenTelemetry, vLLM',
          resumeBullet: 'Implemented CI/CD LLM evaluation gate blocking regressions across 500+ golden test cases before production deploy.',
        },
      ],
    },
    certifications: [
      { name: 'Made With ML — End-to-End MLOps', issuer: 'Made With ML', url: 'https://madewithml.com/', costNote: '100% Free', focus: 'Production ML design, testing, serving, and CI/CD' },
      { name: 'Machine Learning Engineering for Production (MLOps) (Free Audit)', issuer: 'DeepLearning.AI via Coursera', url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops', costNote: 'Free Audit', focus: 'Data drift, model baselines, and deployment lifecycles' },
      { name: 'MLOps Zoomcamp', issuer: 'DataTalks.Club', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', costNote: '100% Free Cohort & Self-Paced', focus: 'MLflow, Prefect, monitoring, and Kubernetes deployment' },
    ],
    flashcards: [
      { id: 'mlops-fc1', topicId: 'mlops-t2', topicTitle: 'Training-Serving Skew', question: 'What is training-serving skew and how do feature stores prevent it?', answer: 'Discrepancy between feature computation in offline training vs live inference; feature stores share one definition and perform point-in-time joins.', difficulty: 'Core' },
      { id: 'mlops-fc2', topicId: 'mlops-t5', topicTitle: 'Covariate vs Concept Drift', question: 'What is the difference between data (covariate) drift and concept drift?', answer: 'Covariate drift shifts P(X) input distribution; concept drift changes P(Y|X), meaning the true relationship between inputs and labels shifted.', difficulty: 'Core' },
      { id: 'mlops-fc3', topicId: 'mlops-t4', topicTitle: 'Dynamic Batching', question: 'How does Triton dynamic batching raise GPU throughput without hurting latency?', answer: 'It buffers incoming single requests for a tiny max_queue_delay (e.g., 2ms) to execute matrix multiplications together efficiently.', difficulty: 'Applied' },
      { id: 'mlops-fc4', topicId: 'mlops-t5', topicTitle: 'Shadow Deployment', question: 'Why run a new model in shadow mode before canary traffic splitting?', answer: 'Shadow mode mirrors live production requests to the challenger model asynchronously, validating latency and predictions with zero user risk.', difficulty: 'Applied' },
      { id: 'mlops-fc5', topicId: 'mlops-t1', topicTitle: 'Reproducibility', question: 'What four artifacts must be pinned to reproduce an ML training run identically?', answer: 'Code commit hash, exact dataset snapshot/hash, software/CUDA environment container, and random seeds + hyperparameters.', difficulty: 'Core' },
      { id: 'mlops-fc6', topicId: 'mlops-t3', topicTitle: 'Continuous Training', question: 'What distinguishes MLOps CI/CD from traditional software CI/CD?', answer: 'Software triggers on code changes; MLOps also triggers continuous training (CT) on data drift, schedule, or new labeled data.', difficulty: 'Applied' },
      { id: 'mlops-fc7', topicId: 'mlops-t5', topicTitle: 'Delayed Labels', question: 'How do you monitor model health when ground-truth labels arrive 30 days late (e.g. loan default)?', answer: 'Track input feature drift (PSI/Wasserstein), prediction distribution shifts, embedding outliers, and proxy engagement metrics.', difficulty: 'Deep Dive' },
      { id: 'mlops-fc8', topicId: 'mlops-t4', topicTitle: 'ONNX Runtime', question: 'Why export PyTorch models to ONNX or TensorRT for production serving?', answer: 'Graph fusion, operator optimization, and removal of Python interpreter overhead cut inference latency significantly.', difficulty: 'Core' },
    ],
  },
  {
    id: 'prompting-ai-tools',
    title: 'Prompting & AI Tools',
    aliases: ['Prompting & AI tools', 'Prompt Engineering', 'Context Engineering'],
    domain: 'ai-ml',
    summary:
      'Systematic prompt & context engineering, few-shot calibration, structured extraction, eval-driven iteration, and multimodal AI tool workflows.',
    estimatedDays: 7,
    tier: 1,
    prerequisites: [],
    unlocks: ['vibe-coding-automation', 'llm', 'product-thinking'],
    cardHeightHint: 'compact',
    dayModules: [
      {
        id: 'prm-d1',
        dayRange: 'Day 1 – 2',
        title: 'Context Engineering & Prompt Architecture',
        objective: 'Replace ad-hoc prompts with structured XML/JSON delimiters and clear system contracts.',
        topics: [
          {
            id: 'prm-t1',
            title: 'Role, Constraints, Delimiters & Few-Shot Exemplars',
            summary: 'Use canonical input/output exemplars and negative constraints to eliminate drift.',
            resources: [
              { title: 'Anthropic Prompt Engineering Interactive Tutorial', provider: 'Anthropic', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', kind: 'Docs' },
              { title: 'OpenAI Prompt Engineering Guide', provider: 'OpenAI', url: 'https://platform.openai.com/docs/guides/prompt-engineering', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'prm-d2',
        dayRange: 'Day 3 – 4',
        title: 'Reasoning Scaffolds & Verification Loops',
        objective: 'Apply chain-of-thought, tree-of-thought, and self-consistency safely.',
        topics: [
          {
            id: 'prm-t2',
            title: 'Chain-of-Thought, Decomposition & Self-Critique',
            summary: 'Break multi-step logic into verifiable intermediate artifacts.',
            resources: [
              { title: 'Prompt Engineering Guide (DAIR.AI)', provider: 'DAIR.AI', url: 'https://www.promptingguide.ai/', kind: 'Guide' },
            ],
          },
        ],
      },
      {
        id: 'prm-d3',
        dayRange: 'Day 5 – 6',
        title: 'Eval-Driven Prompt Engineering',
        objective: 'Version prompts and measure accuracy across automated test suites.',
        topics: [
          {
            id: 'prm-t3',
            title: 'Prompt Regression Suites & Assertion Metrics',
            summary: 'A/B test prompt variants across 50+ edge-case inputs using Promptfoo.',
            resources: [
              { title: 'Promptfoo Evaluation Framework', provider: 'Promptfoo', url: 'https://www.promptfoo.dev/docs/intro/', kind: 'Docs' },
            ],
          },
        ],
      },
      {
        id: 'prm-d4',
        dayRange: 'Day 7',
        title: 'Applied AI Toolchains & Workflow Integration',
        objective: 'Combine research, coding, spreadsheet, and media AI tools responsibly.',
        topics: [
          {
            id: 'prm-t4',
            title: 'AI Research, Coding & Creative Tool Orchestration',
            summary: 'Human-in-the-loop verification checklists for high-stakes outputs.',
            resources: [
              { title: 'Google Prompting Essentials / AI Guides', provider: 'Google AI', url: 'https://ai.google.dev/gemini-api/docs/prompting-strategies', kind: 'Docs' },
            ],
          },
        ],
      },
    ],
    papers: [
      {
        title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models',
        authors: 'Jason Wei et al.',
        year: 2022,
        venue: 'NeurIPS / arXiv:2201.11903',
        url: 'https://arxiv.org/abs/2201.11903',
        takeaway: 'Demonstrated dramatic arithmetic and symbolic reasoning gains via intermediate reasoning steps.',
      },
      {
        title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models',
        authors: 'Xuezhi Wang et al.',
        year: 2022,
        venue: 'ICLR / arXiv:2203.11171',
        url: 'https://arxiv.org/abs/2203.11171',
        takeaway: 'Sampling diverse reasoning paths and taking majority vote sharply boosts accuracy.',
      },
      {
        title: 'Large Language Models as Optimizers (OPRO)',
        authors: 'Chengrun Yang et al.',
        year: 2023,
        venue: 'ICLR / arXiv:2309.03409',
        url: 'https://arxiv.org/abs/2309.03409',
        takeaway: 'Shows iterative automated prompt optimization outperforms manual trial-and-error.',
      },
    ],
    projects: {
      required: [
        {
          title: 'Versioned Prompt Regression Matrix (Promptfoo)',
          tier: 'Required',
          scope: 'Build a 60-case adversarial test suite comparing 3 prompt templates across precision, JSON validity, and cost.',
          stack: 'YAML, Promptfoo, JSON Schema',
          resumeBullet: 'Built automated prompt regression suite across 60 adversarial cases lifting structured extraction accuracy from 74% to 97%.',
        },
        {
          title: 'Domain Context Pack & Few-Shot Library',
          tier: 'Required',
          scope: 'Standardized XML-delimited system prompts for legal, code review, and financial summarization with citation rules.',
          stack: 'Markdown, JSON Schema',
          resumeBullet: 'Authored modular context-engineering templates reducing manual editing time by 55% across internal workflows.',
        },
      ],
      scalable: [
        {
          title: 'Automated Prompt Optimizer & Cost-Router Workbench',
          tier: 'Scalable Capstone',
          scope: 'Route simple classification tasks to compact models and complex synthesis to frontier models based on eval scores.',
          stack: 'TypeScript, Promptfoo, OpenTelemetry',
          resumeBullet: 'Designed eval-backed prompt routing layer cutting token spend by 62% while maintaining 96% rubric parity.',
        },
      ],
    },
    certifications: [
      { name: 'ChatGPT Prompt Engineering for Developers', issuer: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/', costNote: '100% Free', focus: 'Structured prompting, iterative refinement, and summarization' },
      { name: 'DAIR.AI Prompt Engineering Guide', issuer: 'DAIR.AI', url: 'https://www.promptingguide.ai/', costNote: '100% Free Open Resource', focus: 'CoT, ReAct, ToT, and adversarial robustness' },
      { name: 'Prompt Engineering for ChatGPT (Free Audit)', issuer: 'Vanderbilt University via Coursera', url: 'https://www.coursera.org/learn/prompt-engineering', costNote: 'Free Audit', focus: 'Prompt patterns and persona templates' },
    ],
    flashcards: [
      { id: 'prm-fc1', topicId: 'prm-t1', topicTitle: 'Delimiters & Structure', question: 'Why wrap untrusted user text in explicit XML or triple-backtick delimiters?', answer: 'Clear boundaries help the model separate system instructions from passive data, reducing prompt injection risk.', difficulty: 'Core' },
      { id: 'prm-fc2', topicId: 'prm-t2', topicTitle: 'Self-Consistency', question: 'How does self-consistency prompting work?', answer: 'Sample multiple chain-of-thought completions at non-zero temperature and select the most frequent final answer.', difficulty: 'Applied' },
      { id: 'prm-fc3', topicId: 'prm-t3', topicTitle: 'Prompt Evals', question: 'Why is "vibe-checking" 3 examples dangerous when editing system prompts?', answer: 'Fixing one edge case frequently causes silent regressions on 10 other inputs without an automated eval matrix.', difficulty: 'Core' },
      { id: 'prm-fc4', topicId: 'prm-t1', topicTitle: 'Few-Shot Exemplars', question: 'What makes a few-shot example set high-leverage?', answer: 'Covering diverse edge cases, exact target output formatting, and boundary conditions rather than 5 near-identical examples.', difficulty: 'Applied' },
      { id: 'prm-fc5', topicId: 'prm-t2', topicTitle: 'Task Decomposition', question: 'When does splitting one mega-prompt into chained smaller prompts beat a single prompt?', answer: 'When each step needs distinct verification, structured validation, or different context without polluting downstream attention.', difficulty: 'Applied' },
      { id: 'prm-fc6', topicId: 'prm-t4', topicTitle: 'Hallucination Mitigation', question: 'What instruction pattern most reliably cuts fabricated citations?', answer: 'Explicitly giving the model an escape hatch ("If not found in the provided context, respond INSUFFICIENT_EVIDENCE") + quote-first extraction.', difficulty: 'Core' },
      { id: 'prm-fc7', topicId: 'prm-t3', topicTitle: 'Deterministic Metrics', question: 'Which checks should run before LLM-as-Judge in an eval pipeline?', answer: 'Fast deterministic assertions: valid JSON, schema compliance, regex patterns, word limits, and substring grounding.', difficulty: 'Deep Dive' },
      { id: 'prm-fc8', topicId: 'prm-t4', topicTitle: 'Context Window Hygiene', question: 'What is "lost in the middle" syndrome?', answer: 'LLMs recall instructions best at the very beginning and very end of long contexts while under-attending to buried middle facts.', difficulty: 'Applied' },
    ],
  },
];
