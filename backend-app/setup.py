from setuptools import setup, find_packages

setup(
    name="datasage-backend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        'fastapi>=0.68.0',
        'uvicorn>=0.15.0',
        'python-multipart',
        'python-dotenv>=0.19.0',
        'pydantic>=1.8.0',
        'pydantic-settings>=2.0.0',
    ],
    python_requires='>=3.8',
)
