"""Symptom dataset: canonical symptom names, example phrases, foods, remedies.

This is a minimal, easy-to-extend dataset intended for demo and portfolio use.
"""

SYMPTOM_DEFINITIONS = [
    {
        "id": "cramps",
        "name": "Cramps",
        "examples": [
            "cramps",
            "menstrual cramps",
            "severe cramps",
            "stomach cramps",
            "abdominal pain during period",
        ],
        "foods": ["ginger", "banana", "leafy greens", "salmon"],
        "remedies": ["heating pad", "gentle exercise", "ibuprofen", "massage"],
    },
    {
        "id": "fatigue",
        "name": "Fatigue",
        "examples": [
            "tired",
            "exhausted",
            "lack of energy",
            "feeling tired",
            "very tired",
        ],
        "foods": ["iron-rich foods", "lentils", "spinach", "red meat (optional)"],
        "remedies": ["rest", "hydration", "light exercise", "vitamin B complex"],
    },
    {
        "id": "bloating",
        "name": "Bloating",
        "examples": ["bloated", "bloating", "water retention", "swollen belly"],
        "foods": ["peppermint tea", "yogurt (probiotics)", "bananas", "pineapple"],
        "remedies": ["peppermint tea", "walk after meals", "avoid salty foods"],
    },
    {
        "id": "headache",
        "name": "Headache",
        "examples": ["headache", "migraine", "pain in my head", "pounding head"],
        "foods": ["hydrating fluids", "ginger tea", "magnesium-rich foods"],
        "remedies": ["rest in dark room", "hydration", "ibuprofen"],
    },
    {
        "id": "lower_back_pain",
        "name": "Lower Back Pain",
        "examples": [
            "lower back pain",
            "back hurts",
            "pain in my lower back",
            "lower back cramps",
        ],
        "foods": ["turmeric", "omega-3 rich fish", "leafy greens"],
        "remedies": ["heat pack", "stretching", "gentle yoga"],
    },
]
